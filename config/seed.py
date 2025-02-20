import json
import argparse
import requests


class Project:
    def __init__(self, name, ai_sources, callgraph_sources):
        self.name = name
        self.ai_sources = ai_sources
        self.callgraph_sources = callgraph_sources

    def __repr__(self):
        return f"Project(name={self.name}, ai_sources={self.ai_sources}, callgraph_sources={self.callgraph_sources})"


def parse_args():
    parser = argparse.ArgumentParser(
        description="Parse a JSON config file into Project objects."
    )
    parser.add_argument("config_file", type=str,
                        help="Path to the JSON config file")
    parser.add_argument("base_url", type=str,
                        help="Base url to backend service")
    return parser.parse_args()


def load_json_file(config_file):
    with open(config_file, "r", encoding="utf-8") as file:
        return json.load(file)


def get_projects(config_data):
    projects = []
    for project_data in config_data["projects"]:
        name = project_data["projectName"]
        ai_sources = project_data.get("analysis-input-sources", [])
        callgraph_sources = project_data.get("callgraph-sources", [])

        project = Project(name, ai_sources, callgraph_sources)
        projects.append(project)

    return projects


def upload_projects(projects, base_url):
    projects_url = f"{base_url}/projects"
    ai_url = f"{base_url}/analysis-inputs"
    callgraphs_url = f"{base_url}/call-graph-inputs"

    for project in projects:
        project_resp = requests.post(
            projects_url, json={"projectName": project.name})
        print(f"Project create: {project_resp.json()}")
        for ai in project.ai_sources:
            loaded_file = load_json_file(ai["file"])
            resp = requests.post(ai_url, json={
                "projectId": project_resp.json()["id"],
                "version": ai["version"],
                "commitHash": ai["commitHash"],
                "entities": loaded_file["entities"],
                "graph": loaded_file["graph"]
            })
            print(f"AI create: {resp}")

        for cg in project.callgraph_sources:
            loaded_file = load_json_file(cg["file"])
            resp = requests.post(callgraphs_url, json={
                "projectId": project_resp.json()["id"],
                "version": cg["version"],
                "commitHash": cg["commitHash"],
                "callGraph": loaded_file["callGraph"]
            })
            print(f"CallGraph create: {resp}")


def main():
    args = parse_args()
    config_data = load_json_file(args.config_file)
    projects = get_projects(config_data)

    upload_projects(projects, args.base_url)
    for project in projects:
        print(project)


if __name__ == "__main__":
    main()

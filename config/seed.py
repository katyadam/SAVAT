import json
import argparse
import requests


class Project:
    def __init__(self, name, owner, repository, accessToken, callgraph_sources, context_map_sources, sdg_sources):
        self.name = name
        self.owner = owner
        self.repository = repository
        self.accessToken = accessToken
        self.callgraph_sources = callgraph_sources
        self.context_map_sources = context_map_sources
        self.sdg_sources = sdg_sources

    def __repr__(self):
        return f"""Project(
            name={self.name},
            callgraph_sources={self.callgraph_sources}
            context_map_sources={self.context_map_sources}
            sdg_sources={self.sdg_sources}
        )"""


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
        name = project_data["name"]
        owner = project_data["owner"]
        repository = project_data["repository"]
        accessToken = project_data["accessToken"] if "accessToken" in project_data else None
        callgraph_sources = project_data.get("callgraph-sources", [])
        context_map_sources = project_data.get("context-map-sources", [])
        sdg_sources = project_data.get("service-dependency-graph-sources", [])

        project = Project(name, owner, repository, accessToken, callgraph_sources,
                          context_map_sources, sdg_sources)
        projects.append(project)

    return projects


def upload_projects(projects, base_url):
    projects_url = f"{base_url}/projects"
    callgraphs_url = f"{base_url}/call-graph-inputs"
    context_maps_url = f"{base_url}/context-maps"
    sdgs_url = f"{base_url}/sdgs"

    for project in projects:
        project_resp = requests.post(
            projects_url, json={
                "name": project.name,
                "owner": project.owner,
                "repository": project.repository,
                "accessToken": project.accessToken
            })
        print(f"Project create: {project_resp.json()}")

        for cg in project.callgraph_sources:
            loaded_file = load_json_file(cg["file"])
            resp = requests.post(callgraphs_url, json={
                "projectId": project_resp.json()["id"],
                "version": cg["version"],
                "commitHash": cg["commitHash"],
                "callGraph": loaded_file["callGraph"]
            })
            print(f"CallGraph create: {resp}")

        for cm in project.context_map_sources:
            loaded_file = load_json_file(cm["file"])
            resp = requests.post(context_maps_url, json={
                "projectId": project_resp.json()["id"],
                "version": cm["version"],
                "commitHash": cm["commitHash"],
                "contextMap": loaded_file,
            })
            print(f"Context Map Create: {resp}")

        for sdg in project.sdg_sources:
            loaded_file = load_json_file(sdg["file"])
            resp = requests.post(sdgs_url, json={
                "projectId": project_resp.json()["id"],
                "version": sdg["version"],
                "commitHash": sdg["commitHash"],
                "sdg": loaded_file,
            })
            print(f"Service Dependency Graph Create: {resp}")


def main():
    args = parse_args()
    config_data = load_json_file(args.config_file)
    projects = get_projects(config_data)

    upload_projects(projects, args.base_url)
    for project in projects:
        print(project)


if __name__ == "__main__":
    main()

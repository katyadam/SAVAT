package org.adamkattan.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.json.JsonObject;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ConfigFile extends ProjectFile {

    private final JsonObject data;

    public ConfigFile(String name, String path, JsonObject data) {
        super(name, path, FileType.CONFIG);
        this.data = data;
    }

    @JsonProperty("data")
    public JsonObject getData() {
        return data;
    }
}

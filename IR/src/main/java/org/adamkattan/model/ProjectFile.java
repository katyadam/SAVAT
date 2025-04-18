package org.adamkattan.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public abstract class ProjectFile {

    protected String name;
    protected String path;
    protected FileType fileType;

    public ProjectFile() {
    }

    public ProjectFile(String name, String path, FileType fileType) {
        this.name = name;
        this.path = path;
        this.fileType = fileType;
    }

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("path")
    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @JsonProperty("fileType")
    public FileType getFileType() {
        return fileType;
    }

    public void setFileType(FileType fileType) {
        this.fileType = fileType;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProjectFile that)) return false;
        return name.equals(that.name) &&
                path.equals(that.path) &&
                fileType == that.fileType;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, path, fileType);
    }

    @Override
    public String toString() {
        return "ProjectFile{" +
                "name='" + name + '\'' +
                ", path='" + path + '\'' +
                ", fileType=" + fileType +
                '}';
    }
}

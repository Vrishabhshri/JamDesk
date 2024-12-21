const API_BASE_URL = "http://localhost:3000/api";

export const fetchProjects = async () => {

    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {

        throw new Error("Failed to fetch projects");

    }

    return response.json();

}

export const saveProject = async (projectData) => {

    const response = await fetch(`${API_BASE_URL}/projects`, {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(projectData)

    });

    if (!response.ok) {

        throw new Error("Failed to save project");

    }

    return response.json();

}

export const deleteProject = async (projectID) => {

    const response = await fetch(`${API_BASE_URL}/projects?${projectID}`, {

        method: "DELETE"

    });

    if (!response.ok) {

        throw new Error("Failed to delete project");

    }

    return response.json();

}
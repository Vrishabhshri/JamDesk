const API_BASE_URL = "http://localhost:3001";

// Fetching all projects

export const fetchProjects = async () => {

    try {

        const response = await fetch(`${API_BASE_URL}/projects`);
        if (!response.ok) {

            throw new Error("Failed to fetch projects");

        }

        return response.json();

    }
    catch {

        throw new Error("Failed to fetch projects in catch")

    }

}

// Save project

export const saveProject = async (projectData) => {

    try {

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

    catch{

        throw new Error("Failed to save project in catch")

    }

}

// Deleting project

export const deleteProject = async (projectID) => {

    try {

        const response = await fetch(`${API_BASE_URL}/projects?${projectID}`, {

            method: "DELETE"
    
        });
    
        if (!response.ok) {
    
            throw new Error("Failed to delete project");
    
        }
    
        return response.json();

    }

    catch {

        throw new Error("Failed to delete project in catch");

    }

}
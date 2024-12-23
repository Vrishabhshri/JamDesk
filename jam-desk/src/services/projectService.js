const API_BASE_URL = "http://localhost:3001";

// Fetching all projects

export const fetchProjects = async () => {

    try {

        const response = await fetch(`${API_BASE_URL}/projects`);
        if (!response.ok) {

            throw new Error("Failed to fetch projects (fetchProjects)");

        }

        return response.json();

    }
    catch {

        throw new Error("Failed to fetch projects in catch (fetchProjects)")

    }

}

// Fetch a single project by ID

export const fetchProjectByID = async (projectID) => {

    try {

        const response = await fetch(`${API_BASE_URL}/projects/${projectID}`);

        if (!response.ok) {

            throw new Error("Failed to fetch project resources (fetchProjectByID)")

        }

        return response.json()

    }
    catch {

        throw new Error("Failed to load selected project (fetchProjectByID)")

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
    
            throw new Error("Failed to save project (saveProject)");
    
        }
    
        return response.json();

    }

    catch{

        throw new Error("Failed to load selected project (saveProject)")

    }

}

// Deleting project

export const deleteProject = async (projectID) => {

    try {

        const response = await fetch(`${API_BASE_URL}/projects?${projectID}`, {

            method: "DELETE"
    
        });
    
        if (!response.ok) {
    
            throw new Error("Failed to delete project (deleteProject)");
    
        }
    
        return response.json();

    }

    catch {

        throw new Error("Failed to find selected project (deleteProject)");

    }

}
import { v4 } from 'uuid';

export default class Project {

    constructor(name, creator) {

        this.projectID = v4();
        this.projectName = name;
        this.createdDate = new Date();
        this.lastUpdated = new Date();
        this.audioFiles = [];
        this.collaborators = [creator];

    }

    addAudioFiles(fileName, fileURL) {

        this.audioFiles.push({
            name: fileName,
            url: fileURL,
            addedDate: new Date()
        });
        this.updatedLastUpdated();

    }

    removeAudioFile(fileName) {

        this.audioFiles = this.audioFiles.filter(file => file.name !== fileName);
        this.updatedLastUpdated();

    }

    grantAccess(collab) {

        if (!this.people.includes(collab)) {

            this.people.push(collab);
            this.updatedLastUpdated();

        }

    }

    revokeAccess(collab) {

        this.people = this.people.filter(p => p !== collab);
        this.updatedLastUpdated();

    }

    updatedLastUpdated() {

        this.lastUpdated = new Date();

    }

    getSummary() {

        return {
            projectName: this.projectName,
            createdDate: this.createdDate,
            lastUpdated: this.lastUpdated,
            collaborators: this.people
        }

    }

}
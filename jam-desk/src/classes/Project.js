import { v4 } from 'uuid';

export default class Project {

    constructor(name, creator) {

        this.id = v4();
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

    grantAccess(collaboratorSingle) {

        if (!this.people.includes(collaboratorSingle)) {

            this.people.push(collaboratorSingle);
            this.updatedLastUpdated();

        }

    }

    revokeAccess(collaboratorSingle) {

        this.people = this.people.filter(p => p !== collaboratorSingle);
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
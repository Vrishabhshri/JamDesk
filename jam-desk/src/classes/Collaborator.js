import { v4 } from 'uuid';

export default class Collaborator {

    constructor(name) {

        this.collabID = v4();
        this.name = name;

    }

}
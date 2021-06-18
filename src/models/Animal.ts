export class Animal {
    constructor(
    public id: number,
    public name: string,
    public shortDescription: string,
    public longDescription: string,
    public latinName: string,
    public isFed: boolean,
    public medicine: string,
    public yearOfBirth: number,
    public imageUrl: string,
    public lastFed: Date){}
  }
export interface Note {
    id: number;
    title: string;
    isCompleted: boolean;
    isFavorite: boolean;
    date: Date;
    // date?: Date; make it optional 
}

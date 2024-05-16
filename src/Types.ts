export interface IPhoto {
    id: string;
    urls: {
        regular: string;
        small: string;
    };
    description: string;
    likes: number;
    created_at: string;
    openModal: (photo: any) => void; 
}

export interface IResponse {
    total_pages: number;
    results: IPhoto[];
}

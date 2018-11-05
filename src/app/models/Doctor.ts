import { City } from './City';
import { Profession } from './Profession';

export interface Doctor {
    id: number;
    name: string;
    city: City;
    profession: Profession;
    rating: number;
}

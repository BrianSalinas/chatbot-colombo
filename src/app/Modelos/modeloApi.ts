export class modeloApi{
    items:modeloApiItems[];
}

class modeloApiItems{
    access:string;
    address:modeloApiAddress;
    categories:string;
    chains:string;
    distance:string;
    id:string;
    ontologyId:string;
    position:string;
    references:string;
    resultType:string;
    title:string;
}

class modeloApiAddress{
    city:string;
    countryCode:string;
    countryName:string;
    county:string;
    district:string;
    label:string;
    state:string;
    stateCode:string;
    street:string;
}
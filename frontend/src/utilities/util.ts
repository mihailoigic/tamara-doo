import {ISifrarnik} from "../entities/sifrarnik/types";
import Sifrarnik from "../entities/sifrarnik/Sifrarnik";

export const detectIE = (): number | boolean => {
    const userAgent = window.navigator.userAgent;
    const msie = userAgent.indexOf('MSIE ');

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(
            userAgent.substring(msie + 5, userAgent.indexOf('.', msie)),
            10,
        );
    }
    const trident = userAgent.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        const rv = userAgent.indexOf('rv:');
        return parseInt(
            userAgent.substring(rv + 3, userAgent.indexOf('.', rv)),
            10,
        );
    }
    const edge = userAgent.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(
            userAgent.substring(edge + 5, userAgent.indexOf('.', edge)),
            10,
        );
    }
    // other browser
    return false;
};

export const removeUnderline = (string: string): string => {
    return string.replaceAll(' ', '_');
}

export const firstLetter = (string: string): string => {
    const lower = string.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export const firstLetterAllWords = (string: string): string => {
    const array = string.split(" ");
    let returnArray = "";
        array.forEach((item)=> {
            returnArray += `${firstLetter(item)} `;
            }
        )
    return returnArray;
}
export const maxCharacters = (string: string): string => {
    return string.substring(0, 9);
}


export const prepareForSelect = (niz: any): ISifrarnik[] | undefined => {
    let sifrarnikArray: ISifrarnik[] = [];
    niz?.forEach((item: any)=>{
        sifrarnikArray.push(new Sifrarnik(item.naziv, item.id));
    });
    return sifrarnikArray;
}

export const prepareValuesForSelect = (niz: any, apiNiz: any): ISifrarnik[] => {
    let sifrarnikArray: ISifrarnik[] = [];
    niz.forEach((item: any) => {
        const element = apiNiz.find((apiItem: any) => apiItem.label === item);
        sifrarnikArray.push(new Sifrarnik(element.label, element.value));
    })
    return sifrarnikArray;
}

export const getValueFromMultiSelect = (selectedOptions: any) => {
    let options: any[] = [];
    if (selectedOptions.length === undefined) {
        if (selectedOptions.value !== '') {
            const value = Number(selectedOptions.value);
            options.push(value);
            return options;
        } else {
            return [];
        }
    }
    selectedOptions.forEach((option: any) => {
        const value = Number(option.value);
        options.push(value);
    })
    return options;
}

export const filterSearchParams = (searchParams: any) => {
    let api = `?start=${searchParams.start}&pol=${searchParams.pol}`;
    if (searchParams.kategorija !== 0) {
        api+=`&kategorija=${searchParams.kategorija}`;
    }
    if (searchParams.tip !== 0) {
        api+=`&tip=${searchParams.tip}`;
    }
    if (searchParams.search !== "") {
        api+=`&searchTerm=${searchParams.search}`;
    }
    return api;
}

const findId = (cartItems: any) => {
    let id = cartItems.length + 1;
    const item = cartItems.find((item: any)=>item.cartId === id);
    while (true) {
        if (!item) {
            return id;
        } else {
            id++;
        }
    }
}

export const addToCart = (proizvod: any) => {
    let cartItems = JSON.parse(<string>localStorage.getItem("cartItems"));
    if (cartItems === null) cartItems = [];
    proizvod.cartId = findId(cartItems);
    cartItems.push(proizvod);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const removeFromCart = (id: number) => {
    let cartItems = JSON.parse(<string>localStorage.getItem("cartItems"));
    const newCartItems = cartItems.filter((item: any) => item.cartId !== id);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
}

export const getSearchParams = (searchParams: any, colors: any, brands: any) => {
    let params: any = {};
    params.start = searchParams.start;
    params.pol = searchParams.pol;
    if (searchParams.kategorija !== 0) {
        params.kategorija = searchParams.kategorija;
    }
    if (searchParams.tip !== 0) {
        params.tip = searchParams.tip;
    }
    if (searchParams.search !== "") {
        params.search = searchParams.search;
    }
    if (colors?.length > 0 || brands?.length > 0) {
        params.filters = {};
    }
    if (colors?.length > 0) {
        params.filters.boje = colors;
    }
    if (brands?.length > 0) {
        params.filters.brend = brands;
    }

    return params;
}

export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

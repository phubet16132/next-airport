export interface Passenger {
    id: string;
    name: string;
    type: string;
    seat: string;
    pnr: string;
    seq: string;
}

export const MOCK_PASSENGERS: Passenger[] = [
    // Adult users
    { id: '1', name: 'ALEX HUUM', type: 'ADT', seat: '12A', pnr: 'ABC123', seq: '023' },
    { id: '2', name: 'Somsee Kuum', type: 'ADT', seat: '12B', pnr: 'ABC123', seq: '024' },
    { id: '3', name: 'Baby Kuum', type: 'INF', seat: '12A', pnr: 'ABC123', seq: '025' },

    // Child traveling alone (Unaccompanied Minor error trigger)
    { id: '4', name: 'Little Timmy', type: 'CHD', seat: '14C', pnr: 'UMNR99', seq: '055' },
    { id: '5', name: 'Baby Timmy', type: 'INF', seat: '14C', pnr: 'UMNR99', seq: '056' },

    // Single passenger test
    { id: '6', name: 'Jane Solo', type: 'ADT', seat: '8F', pnr: 'SOLO11', seq: '010' }
];

export const fetchPassengers = async (pnr?: string): Promise<Passenger[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = sessionStorage.getItem('currentPnr');
            if (data || pnr) {
                const searchPnr = (pnr || data)?.toUpperCase();
                resolve(MOCK_PASSENGERS.filter(p => p.pnr.toUpperCase() === searchPnr));
            } else {
                resolve(MOCK_PASSENGERS);
            }
        }, 1000);
    });
};

export const fetchBoardingPasses = async (): Promise<Passenger[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = sessionStorage.getItem('currentPnr');
            if (data) {
                resolve(MOCK_PASSENGERS.filter(p => p.pnr.toUpperCase() === data.toUpperCase()));
            } else {
                resolve(MOCK_PASSENGERS);
            }
        }, 2000);
    });
};

export const validateBooking = async (lastName: string, pnr: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const isValid = MOCK_PASSENGERS.some(
                p => p.pnr.toUpperCase() === pnr.toUpperCase() &&
                    p.name.split(' ').pop()?.toUpperCase() === lastName.toUpperCase()
            );
            resolve(isValid);
        }, 800);
    });
};

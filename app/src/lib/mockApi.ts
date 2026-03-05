export interface Passenger {
    id: string;
    name: string;
    type: string;
    seat: string;
    pnr: string;
    seq: string;
}

export const MOCK_PASSENGERS: Passenger[] = [
    { id: '1', name: 'ALEX HUUM', type: 'ADT', seat: '12A', pnr: 'ABC123', seq: '023' },
    { id: '2', name: 'Somsee Kuum', type: 'ADT', seat: '12B', pnr: 'ABC123', seq: '024' },
];

export const fetchPassengers = async (): Promise<Passenger[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_PASSENGERS);
        }, 1000);
    });
};

export const fetchBoardingPasses = async (): Promise<Passenger[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_PASSENGERS);
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

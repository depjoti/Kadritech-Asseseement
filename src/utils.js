// src/utils.js
export const getStatusColor = (status) => {
    switch (status) {
        case 'New':
            return 'lightblue';
        case 'Ongoing':
            return 'orange';
        case 'Done':
            return 'lightgreen';
        default:
            return 'white';
    }
};

import Swal from 'sweetalert2';

export const showSuccessAlert = (title:string, message: string,timer: number) => {
    return Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        confirmButtonColor: "#536493",
        timer: timer,
        showConfirmButton: false,
    });
};

export const showErrorAlert = (message: string) => {
    return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        confirmButtonColor: "#536493",
        timer: 2000,
        showConfirmButton: false,
    });
};

export const showInfoAlert = (message: string) => {
    return Swal.fire({
        icon: 'info',
        title: 'Info',
        text: message,
        confirmButtonColor: "#536493",
        timer: 2000,
        showConfirmButton: false,
    });
}
import Swal from 'sweetalert2';

export const showSuccessAlert = (title: string, message: string, timer: number) => {
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

export const showAlertWithTwoOptions = (
  title: string,
  message: string,
  option1: string,
  option2: string,
  onOption1: () => void,
  onOption2: () => void
) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: option1,
    cancelButtonText: option2,
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      onOption1();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onOption2();
    }
  });
};
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

export const showAlertWithTwoOptions = (
    title: string,
    message: string,
    option1: string,
    option2: string,
    onOption1: () => void, // Callback for Option 1
    onOption2: () => void  // Callback for Option 2
  ) => {
    Swal.fire({
      title: title,
      text: message,
      icon: "question",
      showCancelButton: true, // Enables the cancel button
      confirmButtonText: option1, // Text for the confirm button
      cancelButtonText: option2, // Text for the cancel button
      reverseButtons: true, // Makes the cancel button appear on the left
    }).then((result) => {
      if (result.isConfirmed) {
        // Execute the callback for Option 1
        onOption1();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Execute the callback for Option 2
        onOption2();
      }
    });
  };
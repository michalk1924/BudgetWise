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

export const showAlertWithTwoOptions = () => {
    Swal.fire({
      title: "Choose an Option",
      text: "Please select one of the options below:",
      icon: "question",
      showCancelButton: true, // Enables the cancel button
      confirmButtonText: "Option 1", // Text for the confirm button
      cancelButtonText: "Option 2", // Text for the cancel button
      reverseButtons: true, // Makes the cancel button appear on the left
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle "Option 1" logic
        console.log("Option 1 chosen");
        Swal.fire("You chose Option 1!", "", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle "Option 2" logic
        console.log("Option 2 chosen");
        Swal.fire("You chose Option 2!", "", "info");
      }
    });
  };
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("formMessage");

  // URL where form information will be sent
  const webhookURL = "";

  // Show error message next to the input field
  const showError = (input, message) => {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
  };

  // Remove all error messages
  const clearErrors = () => {
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
  };

  // Validate the form inputs based on the defined rules
  const validateForm = () => {
    let isValid = true;

    form.querySelectorAll("[data-validation]").forEach((input) => {
      const validations = input.dataset.validation.split(" ");
      validations.forEach((rule) => {
        switch (rule) {
          case "required":
            if (!input.value.trim()) {
              showError(input, "This field is required");
              isValid = false;
            }
            break;
          case "email":
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
              showError(input, "Please enter a valid email address");
              isValid = false;
            }
            break;
          default:
            break;
        }
      });
    });

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    clearErrors();

    if (validateForm()) {
      const formData = new FormData(form);

      try {
        const response = await fetch(webhookURL, {
          method: "POST",
          body: formData,
          mode: "no-cors",
        });

        if (response.ok) {
          formMessage.innerHTML = "Message sent successfully!";
          form.reset(); // Reset the form after successful submission
        } else {
          throw new Error("Failed to send message.");
        }
      } catch (error) {
        formMessage.innerHTML = "An error occurred. Please try again later.";
        console.error("Error:", error);
      }
    }
  };

  form.addEventListener("submit", handleSubmit);
});

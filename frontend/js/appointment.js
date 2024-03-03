window.addEventListener('DOMContentLoaded', async () => {
    // Function to fetch and display appointments
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:3000/appointments');
        const data = await response.json();
        const appointmentsContainer = document.getElementById('appointmentsContainer');
        appointmentsContainer.innerHTML = ''; // Clear previous appointments
        data.forEach(appointment => {
          const appointmentElement = document.createElement('div');
          appointmentElement.textContent = `Patient: ${appointment.patient_name}, Date: ${appointment.appointment_date}`;
          appointmentsContainer.appendChild(appointmentElement);
        });
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
  
    // Fetch and display appointments when the page loads
    fetchAppointments();
  
    // Handle form submission
    const appointmentForm = document.getElementById('appointmentForm');
    appointmentForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent default form submission
  
      // Extract form data
      const formData = new FormData(appointmentForm);
      const appointmentData = {};
      formData.forEach((value, key) => {
        appointmentData[key] = value;
      });
  
      try {
        // Send a POST request to the server to save the appointment data
        const response = await fetch('http://localhost:3000/appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(appointmentData)
        });
        if (response.ok) {
          // If the request was successful, fetch and display appointments again
          fetchAppointments();
          // Clear the form
          appointmentForm.reset();
        } else {
          console.error('Failed to save appointment');
        }
      } catch (error) {
        console.error('Error saving appointment:', error);
      }
    });
  });
  
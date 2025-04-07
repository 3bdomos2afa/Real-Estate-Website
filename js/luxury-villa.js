document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery Functionality
    const galleryImages = document.querySelectorAll('.gallery-image');
    const galleryDots = document.querySelectorAll('.gallery-dot');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    let currentIndex = 0;

    // Function to show image at specific index
    function showImage(index) {
        // Hide all images
        galleryImages.forEach(img => {
            img.classList.remove('active');
        });
        
        // Remove active class from all dots
        galleryDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected image and activate the corresponding dot
        galleryImages[index].classList.add('active');
        galleryDots[index].classList.add('active');
        
        // Update current index
        currentIndex = index;
    }

    // Event listeners for dots
    galleryDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showImage(index);
        });
    });

    // Event listener for previous button
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = galleryImages.length - 1;
            }
            showImage(newIndex);
        });
    }

    // Event listener for next button
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= galleryImages.length) {
                newIndex = 0;
            }
            showImage(newIndex);
        });
    }

    // Auto-rotate gallery every 5 seconds
    setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= galleryImages.length) {
            newIndex = 0;
        }
        showImage(newIndex);
    }, 5000);

    // Payment Form Functionality
    const cardNumber = document.getElementById('card-number');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = '';
            for(let i = 0; i < value.length; i++) {
                if(i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            e.target.value = formattedValue;
        });
    }

    const expiry = document.getElementById('expiry');
    if (expiry) {
        expiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if(value.length >= 2) {
                value = value.slice(0,2) + '/' + value.slice(2);
            }
            e.target.value = value;
        });
    }

    const cvv = document.getElementById('cvv');
    if (cvv) {
        cvv.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    const form = document.getElementById('payment-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const payBtn = document.querySelector('.pay-btn');
            payBtn.innerHTML = '<i class="bi bi-check-circle"></i> Payment Successful!';
            payBtn.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                closeModal();
            }, 2000);
        });
    }

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    const modal = document.querySelector('.payment-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if(e.target === modal) {
                closeModal();
            }
        });
    }

    function closeModal() {
        const modal = document.querySelector('.payment-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    window.openPaymentModal = function(imageSrc, title, price) {
        const modal = document.querySelector('.payment-modal');
        if (modal) {
            document.getElementById('property-image').src = imageSrc;
            document.getElementById('property-title').textContent = title;
            document.getElementById('property-price').textContent = price;
            modal.style.display = 'flex';
        }
    }
}); 
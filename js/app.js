// API Base URL
const API_BASE_URL = "https://bookmyclass-backend.onrender.com";

let webstore = new Vue({
  el: "#app",
  data: {
    showCartPage: false,
    cartCount: 0,
    cart: [],
    currentSlide: 0,
    selectedCategory: "All",
    priceRange: [800, 2100], 
    sortBy: "subject",
    sortOrder: "asc",
    searchQuery: "",
    userRegion: "",
    isProcessing: false,
    searchResults: [],
    isSearching: false,
    searchDebounceTimer: null,

    // Checkout Information
    checkoutInfo: {
      parentName: "",
      phone: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    checkoutErrors: {
      parentName: "",
      phone: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    currentOrder: null,

    // Child Info Modal Data
    selectedLesson: null,
    childInfo: {
      name: "",
      age: "",
      selectedDay: "",
    },
    availableDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],

    regionDistances: {
      North: { North: 0, Central: 1, East: 2, West: 2, South: 3 },
      South: { South: 0, Central: 1, East: 2, West: 2, North: 3 },
      Central: { Central: 0, North: 1, South: 1, East: 1, West: 1 },
      East: { East: 0, Central: 1, North: 2, South: 2, West: 3 },
      West: { West: 0, Central: 1, North: 2, South: 2, East: 3 },
    },

    lessons: [],
  },

  computed: {
    // Check if child info is valid for form submission
    isChildInfoValid: function () {
      return (
        this.childInfo.name.trim() !== "" &&
        this.childInfo.age !== "" &&
        this.childInfo.age >= 5 &&
        this.childInfo.age <= 18 &&
        this.childInfo.selectedDay !== ""
      );
    },

    // Check if checkout form is valid
    isCheckoutValid: function () {
      this.validateCheckoutForm();
      return (
        !Object.values(this.checkoutErrors).some((error) => error !== "") &&
        this.checkoutInfo.parentName.trim() !== "" &&
        this.checkoutInfo.phone.trim() !== "" &&
        this.checkoutInfo.cardNumber.trim() !== "" &&
        this.checkoutInfo.expiryDate.trim() !== "" &&
        this.checkoutInfo.cvv.trim() !== ""
      );
    },

    discountedLessons: function () {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const sourceLessons = this.isSearching
        ? this.searchResults
        : this.lessons;

      const discountedLessons = sourceLessons.filter(function (lesson) {
        if (!lesson.discounted) return false;

        const discountEnd = new Date(lesson.discountEnd);
        discountEnd.setHours(23, 59, 59, 999);

        return discountEnd >= today;
      });

      const lessonsWithDaysLeft = discountedLessons.map(function (lesson) {
        const discountEnd = new Date(lesson.discountEnd);
        discountEnd.setHours(23, 59, 59, 999);

        const endDay = new Date(discountEnd);
        endDay.setHours(0, 0, 0, 0);

        const timeDiff = endDay.getTime() - today.getTime();
        const daysLeft = timeDiff / (1000 * 60 * 60 * 24);

        return {
          ...lesson,
          daysLeft: Math.max(0, daysLeft),
        };
      });

      return this.mergeSort(lessonsWithDaysLeft, "daysLeft", "asc");
    },

    filteredDiscountedLessons: function () {
      const filtered = this.discountedLessons.filter(
        function (lesson) {
          const matchesCategory =
            this.selectedCategory === "All" ||
            lesson.category === this.selectedCategory;
          const currentPrice = lesson.discounted
            ? this.calculateDiscountedPrice(lesson)
            : lesson.price;
          const matchesPrice =
            currentPrice >= this.priceRange[0] &&
            currentPrice <= this.priceRange[1];

          return matchesCategory && matchesPrice;
        }.bind(this)
      );

      return filtered;
    },

    filteredLessons: function () {
      // Use search results if searching, otherwise use all lessons
      const sourceLessons = this.isSearching
        ? this.searchResults
        : this.lessons;

      let filtered = sourceLessons.filter(
        function (lesson) {
          const matchesCategory =
            this.selectedCategory === "All" ||
            lesson.category === this.selectedCategory;
          const currentPrice = lesson.discounted
            ? this.calculateDiscountedPrice(lesson)
            : lesson.price;
          const matchesPrice =
            currentPrice >= this.priceRange[0] &&
            currentPrice <= this.priceRange[1];

          return matchesCategory && matchesPrice;
        }.bind(this)
      );

      filtered = this.mergeSort(filtered, this.sortBy, this.sortOrder);

      return filtered;
    },
  },

  methods: {
    // Merge sort implementation
    mergeSort: function (
      array,
      sortBy = this.sortBy,
      sortOrder = this.sortOrder
    ) {
      // Base case: if array has 1 or 0 elements, it's already sorted
      if (array.length <= 1) {
        return array;
      }

      // Step 1: Divide the array into two halves
      const middle = Math.floor(array.length / 2);
      const leftHalf = array.slice(0, middle);
      const rightHalf = array.slice(middle);

      // Step 2: Recursively sort both halves
      const sortedLeft = this.mergeSort(leftHalf, sortBy, sortOrder);
      const sortedRight = this.mergeSort(rightHalf, sortBy, sortOrder);

      // Step 3: Merge the sorted halves back together
      return this.merge(sortedLeft, sortedRight, sortBy, sortOrder);
    },

    merge: function (left, right, sortBy, sortOrder) {
      // This function merges two sorted arrays into one sorted array
      let result = [];
      let leftIndex = 0;
      let rightIndex = 0;

      // Compare elements from left and right arrays and add smaller one to result
      while (leftIndex < left.length && rightIndex < right.length) {
        const leftLesson = left[leftIndex];
        const rightLesson = right[rightIndex];

        // Compare the two lessons based on current sort criteria
        if (
          this.compareLessons(leftLesson, rightLesson, sortBy, sortOrder) <= 0
        ) {
          result.push(leftLesson);
          leftIndex++;
        } else {
          result.push(rightLesson);
          rightIndex++;
        }
      }

      // Add any remaining elements from left array
      while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
      }

      // Add any remaining elements from right array
      while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
      }

      return result;
    },

    compareLessons: function (
      lessonA,
      lessonB,
      sortBy = this.sortBy,
      sortOrder = this.sortOrder
    ) {
      // This function compares two lessons based on the selected sort criteria
      // Returns: -1 if lessonA comes first, 1 if lessonB comes first, 0 if equal

      let valueA;
      let valueB;

      // Special case for discounted lessons sorting by daysLeft
      if (sortBy === "daysLeft") {
        valueA = lessonA.daysLeft;
        valueB = lessonB.daysLeft;

        if (sortOrder === "asc") {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      }

      // Determine what values to compare based on sortBy option
      if (sortBy === "subject") {
        valueA = lessonA.subject.toLowerCase();
        valueB = lessonB.subject.toLowerCase();
      } else if (sortBy === "location") {
        // Special handling for location sorting
        if (this.userRegion && this.userRegion !== "") {
          // If user selected a region, sort by distance from that region
          const regionA = this.extractRegion(lessonA.location);
          const regionB = this.extractRegion(lessonB.location);

          const distanceA =
            this.regionDistances[this.userRegion][regionA] ?? 99;
          const distanceB =
            this.regionDistances[this.userRegion][regionB] ?? 99;

          // If distances are different, compare by distance
          if (distanceA !== distanceB) {
            if (sortOrder === "asc") {
              return distanceA - distanceB;
            } else {
              return distanceB - distanceA;
            }
          }

          // If distances are same, compare alphabetically by location name
          valueA = this.getLocationDisplay(lessonA.location).toLowerCase();
          valueB = this.getLocationDisplay(lessonB.location).toLowerCase();
        } else {
          // No region selected, just sort alphabetically by location
          valueA = lessonA.location.toLowerCase();
          valueB = lessonB.location.toLowerCase();
        }
      } else if (sortBy === "price") {
        // Get actual price (considering discounts)
        valueA = lessonA.discounted
          ? this.calculateDiscountedPrice(lessonA)
          : lessonA.price;
        valueB = lessonB.discounted
          ? this.calculateDiscountedPrice(lessonB)
          : lessonB.price;
      } else if (sortBy === "spaces") {
        // Get available spaces
        valueA = this.calculateAvailableSpaces(lessonA);
        valueB = this.calculateAvailableSpaces(lessonB);
      } else {
        // Default to subject if sortBy is not recognized
        valueA = lessonA.subject.toLowerCase();
        valueB = lessonB.subject.toLowerCase();
      }

      // Compare the values based on sort order (ascending or descending)
      if (sortOrder === "asc") {
        // Ascending order: smaller values come first
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      } else {
        // Descending order: larger values come first
        if (valueA > valueB) return -1;
        if (valueA < valueB) return 1;
        return 0;
      }
    },

    // A. GET - Fetch all lessons from backend
    async fetchLessons() {
      try {
        const response = await fetch(`${API_BASE_URL}/lessons`);
        if (!response.ok) {
          throw new Error("Failed to fetch lessons");
        }
        const data = await response.json();
        this.lessons = data;
        console.log("Lessons fetched successfully:", this.lessons.length);
      } catch (error) {
        console.error("Error fetching lessons:", error);
        alert("Failed to load lessons. Please refresh the page.");
      }
    },

    // B. POST - Save order to backend
    async saveOrder(orderData) {
      try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          throw new Error("Failed to save order");
        }

        const result = await response.json();
        console.log("Order saved successfully:", result);
        return result;
      } catch (error) {
        console.error("Error saving order:", error);
        throw error;
      }
    },

    // C. PUT - Update lesson with new student booking
    async updateLessonBooking(lessonId, childName, selectedDay, spacesBooked) {
      try {
        const lesson = this.getLessonById(lessonId);
        if (!lesson) {
          throw new Error("Lesson not found");
        }

        // Find or create the day in sessionsBooked
        let daySession = lesson.sessionsBooked
          ? lesson.sessionsBooked.find((s) => s.day === selectedDay)
          : null;

        if (!daySession) {
          daySession = {
            day: selectedDay,
            students: [],
          };
          if (!lesson.sessionsBooked) {
            lesson.sessionsBooked = [];
          }
          lesson.sessionsBooked.push(daySession);
        }

        // Add the new student
        daySession.students.push({
          name: childName,
          spacesBooked: spacesBooked,
        });

        // Prepare update data
        const updateData = {
          sessionsBooked: lesson.sessionsBooked,
        };

        const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          throw new Error("Failed to update lesson");
        }

        const result = await response.json();
        console.log("Lesson updated successfully:", result);

        // Update local data
        const lessonIndex = this.lessons.findIndex((l) => l.id === lessonId);
        if (lessonIndex !== -1) {
          this.lessons[lessonIndex] = result;
        }

        return result;
      } catch (error) {
        console.error("Error updating lesson:", error);
        throw error;
      }
    },

    // BACKEND SEARCH - Search as you type functionality
    async performSearch() {
      // Clear previous debounce timer
      if (this.searchDebounceTimer) {
        clearTimeout(this.searchDebounceTimer);
      }

      // If search query is empty, reset to show all lessons
      if (this.searchQuery.trim() === "") {
        this.searchResults = [];
        this.isSearching = false;
        return;
      }

      // Debounce search - wait 300ms after user stops typing
      this.searchDebounceTimer = setTimeout(async () => {
        try {
          this.isSearching = true;

          // Call backend search API
          const response = await fetch(
            `${API_BASE_URL}/search?q=${encodeURIComponent(this.searchQuery)}`
          );

          if (!response.ok) {
            throw new Error("Search request failed");
          }

          const result = await response.json();

          if (result.success) {
            this.searchResults = result.data;
            console.log(
              `Search found ${result.count} results for: "${this.searchQuery}"`
            );
          } else {
            console.error("Search error:", result.error);
            this.searchResults = [];
          }
        } catch (error) {
          console.error("Error performing search:", error);
          this.searchResults = [];
          // Don't show alert for search errors, just log them
        }
      }, 300); // 300ms debounce delay for "search as you type"
    },

    // Calculate available spaces based on spaces minus all booked students
    calculateAvailableSpaces(lesson) {
      
      const totalSpaces = lesson.spaces || 0;

      if (!lesson.sessionsBooked || lesson.sessionsBooked.length === 0) {
        return totalSpaces;
      }

      let totalBooked = 0;
      lesson.sessionsBooked.forEach((daySession) => {
        if (daySession.students && Array.isArray(daySession.students)) {
          daySession.students.forEach((student) => {
            totalBooked += student.spacesBooked || 1;
          });
        }
      });

      return Math.max(0, totalSpaces - totalBooked);
    },

    // Toggle between store and cart page
    toggleCartPage: function () {
      this.showCartPage = !this.showCartPage;
      if (!this.showCartPage) {
        this.resetCheckoutForm();
      }
    },

    // Reset checkout form
    resetCheckoutForm: function () {
      this.checkoutInfo = {
        parentName: "",
        phone: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      };
      this.checkoutErrors = {
        parentName: "",
        phone: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      };
    },

    // Validate checkout form
    validateCheckoutForm: function () {
      this.checkoutErrors = {
        parentName: "",
        phone: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      };

      const nameRegex = /^[A-Za-z\s]+$/;
      if (!this.checkoutInfo.parentName.trim()) {
        this.checkoutErrors.parentName = "Parent name is required";
      } else if (!nameRegex.test(this.checkoutInfo.parentName)) {
        this.checkoutErrors.parentName =
          "Parent name should contain only letters";
      }

      const phoneRegex = /^\d+$/;
      if (!this.checkoutInfo.phone.trim()) {
        this.checkoutErrors.phone = "Phone number is required";
      } else if (!phoneRegex.test(this.checkoutInfo.phone)) {
        this.checkoutErrors.phone = "Phone number should contain only numbers";
      } else if (this.checkoutInfo.phone.length < 7) {
        this.checkoutErrors.phone = "Phone number is too short";
      }

      const cardRegex = /^\d{16}$/;
      const cleanCardNumber = this.checkoutInfo.cardNumber.replace(/\s/g, "");
      if (!cleanCardNumber) {
        this.checkoutErrors.cardNumber = "Card number is required";
      } else if (!cardRegex.test(cleanCardNumber)) {
        this.checkoutErrors.cardNumber = "Card number must be 16 digits";
      }

      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!this.checkoutInfo.expiryDate.trim()) {
        this.checkoutErrors.expiryDate = "Expiry date is required";
      } else if (!expiryRegex.test(this.checkoutInfo.expiryDate)) {
        this.checkoutErrors.expiryDate = "Format must be MM/YY";
      }

      const cvvRegex = /^\d{3}$/;
      if (!this.checkoutInfo.cvv.trim()) {
        this.checkoutErrors.cvv = "CVV is required";
      } else if (!cvvRegex.test(this.checkoutInfo.cvv)) {
        this.checkoutErrors.cvv = "CVV must be 3 digits";
      }
    },

    // Format card number with spaces
    formatCardNumber: function () {
      let value = this.checkoutInfo.cardNumber.replace(/\s/g, "");
      if (value.length > 0) {
        value = value.match(/.{1,4}/g).join(" ");
      }
      this.checkoutInfo.cardNumber = value;
      this.validateCheckoutForm();
    },

    // Format expiry date
    formatExpiryDate: function () {
      let value = this.checkoutInfo.expiryDate.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      this.checkoutInfo.expiryDate = value;
      this.validateCheckoutForm();
    },

    // Encryption for card details
    encryptCardData: function (data) {
      return data
        .split("")
        .map((char) => {
          if (char.match(/[0-9]/)) {
            return String.fromCharCode(
              ((char.charCodeAt(0) - 48 + 5) % 10) + 48
            );
          }
          return char;
        })
        .join("");
    },

    // Encryption for CVV
    encryptCVV: function (cvv) {
      let num = parseInt(cvv);
      let encrypted = ((num << 2) + 15) ^ 42;
      return encrypted.toString();
    },

    // Process checkout
    async processCheckout() {
      this.validateCheckoutForm();
      if (!this.isCheckoutValid || this.isProcessing) {
        return;
      }

      this.isProcessing = true;

      try {
        // Encrypt sensitive payment data
        const encryptedCardData = {
          cardNumber: this.encryptCardData(
            this.checkoutInfo.cardNumber.replace(/\s/g, "")
          ),
          expiryDate: this.encryptCardData(this.checkoutInfo.expiryDate),
          cvv: this.encryptCVV(this.checkoutInfo.cvv),
        };

        // Prepare order data for backend
        const orderData = {
          customer: {
            parentName: this.checkoutInfo.parentName,
            phoneNumber: this.checkoutInfo.phone,
          },
          orderItems: this.cart.map((item) => ({
            lessonID: item.lessonId,
            title: item.lessonTitle,
            spaces: 1,
            priceAtBooking: item.price,
            childInfo: {
              name: item.childName,
              age: item.childAge,
              selectedDay: item.selectedDay,
            },
          })),
        };

        // B. POST - Save order to backend
        const orderResult = await this.saveOrder(orderData);

        // C. PUT - Update each lesson with the new booking
        for (const item of this.cart) {
          await this.updateLessonBooking(
            item.lessonId,
            item.childName,
            item.selectedDay,
            1 // spaces booked
          );
        }

        // Create order confirmation data 
        this.currentOrder = {
          orderId: orderResult.orderId,
          date: this.getCurrentDate(),
          parentName: this.checkoutInfo.parentName,
          phone: this.checkoutInfo.phone,
          items: [...this.cart],
          subtotal: this.calculateTotal(),
          total: this.calculateTotal(),
        };

        // Show confirmation modal
        const modal = new bootstrap.Modal(
          document.getElementById("orderConfirmationModal")
        );
        modal.show();
      } catch (error) {
        console.error("Checkout error:", error);
        alert("Failed to complete checkout. Please try again.");
      } finally {
        this.isProcessing = false;
      }
    },

    // Close confirmation and reset
    closeConfirmation: function () {
      this.cart = [];
      this.cartCount = 0;
      this.showCartPage = false;
      this.resetCheckoutForm();
      this.currentOrder = null;

      // Reload lessons to get updated data
      this.fetchLessons();
    },

    // Open the child info modal
    openChildModal: function (lesson) {
      const availableSpaces = this.calculateAvailableSpaces(lesson);
      if (availableSpaces > 0) {
        this.selectedLesson = lesson;
        this.childInfo = {
          name: "",
          age: "",
          selectedDay: "",
        };
        const modal = new bootstrap.Modal(
          document.getElementById("childInfoModal")
        );
        modal.show();
      }
    },

    // Confirm and add to cart
    confirmAddToCart: function () {
      if (
        this.selectedLesson &&
        this.calculateAvailableSpaces(this.selectedLesson) > 0 &&
        this.isChildInfoValid
      ) {
        // Add to cart with child info
        this.cart.push({
          lessonId: this.selectedLesson.id,
          lessonTitle: this.selectedLesson.title,
          price: this.selectedLesson.discounted
            ? this.calculateDiscountedPrice(this.selectedLesson)
            : this.selectedLesson.price,
          childName: this.childInfo.name,
          childAge: this.childInfo.age,
          selectedDay: this.childInfo.selectedDay,
          sessions: this.selectedLesson.sessions,
        });

        this.cartCount++;

        console.log("Added to cart:", this.selectedLesson.title);
        console.log("Child info:", this.childInfo);
        console.log("Cart items:", this.cart);

        // Close the modal
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("childInfoModal")
        );
        modal.hide();

        this.selectedLesson = null;
      }
    },

    // Remove item from cart
    removeFromCart: function (index) {
      const item = this.cart[index];
      this.cart.splice(index, 1);
      this.cartCount--;
      console.log("Removed from cart:", item.lessonTitle);
      
      // Automatically go back to main page if cart becomes empty
      if (this.cart.length === 0) {
        this.showCartPage = false;
      }
    },

    // Get lesson by ID
    getLessonById: function (lessonId) {
      return this.lessons.find((lesson) => lesson.id === lessonId) || {};
    },

    // Calculate total
    calculateTotal: function () {
      return this.cart.reduce((total, item) => total + item.price, 0);
    },

    // Get current date
    getCurrentDate: function () {
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },

    calculateDiscountedPrice: function (lesson) {
      return Math.round(lesson.price * (1 - lesson.discountPercent / 100));
    },

    extractRegion: function (location) {
      const parts = location.split(",");
      return parts[0].trim();
    },

    getLocationDisplay: function (location) {
      const parts = location.split(",");
      return parts.slice(1).join(",").trim();
    },

    getUrgencyClass: function (lesson) {
      if (!lesson.discounted) return "green";

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const discountEnd = new Date(lesson.discountEnd);
      discountEnd.setHours(0, 0, 0, 0);

      const timeDiff = discountEnd.getTime() - today.getTime();
      const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      if (daysLeft <= 1) return "red"; 
      if (daysLeft <= 3) return "orange"; 
      return "green";
    },

    getSpacesUrgencyClass: function (lesson) {
      const availableSpaces = this.calculateAvailableSpaces(lesson);
      const totalSpaces = lesson.spaces || 1;

      if (availableSpaces === 0) return "red";
      if (availableSpaces <= Math.ceil(totalSpaces * 0.25)) return "red";
      if (availableSpaces <= Math.ceil(totalSpaces * 0.5)) return "orange";
      return "green";
    },

    getDaysText: function (daysLeft) {
      if (daysLeft === 0) return "Last day";
      if (daysLeft === 1) return "1 day left";
      return `${daysLeft} days left`;
    },

    prevSlide: function () {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },

    nextSlide: function () {
      if (this.currentSlide < this.filteredDiscountedLessons.length - 1) {
        this.currentSlide++;
      }
    },

    // FIXED: Proper price range update method
    updatePriceRange: function () {
      // Ensure values are numbers
      this.priceRange[0] = parseInt(this.priceRange[0]) || 800;
      this.priceRange[1] = parseInt(this.priceRange[1]) || 2100;
      
      // Ensure min doesn't go below 800
      if (this.priceRange[0] < 800) {
        this.priceRange[0] = 800;
      }
      
      // Ensure max doesn't go above 2100
      if (this.priceRange[1] > 2100) {
        this.priceRange[1] = 2100;
      }
      
      // Ensure min is not greater than max
      if (this.priceRange[0] > this.priceRange[1]) {
        this.priceRange[0] = this.priceRange[1];
      }
      
      // Ensure max is not less than min
      if (this.priceRange[1] < this.priceRange[0]) {
        this.priceRange[1] = this.priceRange[0];
      }
    },

    toggleSortOrder: function () {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    },

    // Check and update expired discounts
    async checkExpiredDiscounts() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const expiredLessons = this.lessons.filter((lesson) => {
        if (!lesson.discounted) return false;

        const discountEnd = new Date(lesson.discountEnd);
        discountEnd.setHours(23, 59, 59, 999);

        return discountEnd < today;
      });

      // Update expired discounts in backend
      for (const lesson of expiredLessons) {
        try {
          const updateData = {
            discounted: false,
            discountPercent: 0,
            discountStart: "",
            discountEnd: "",
          };

          await fetch(`${API_BASE_URL}/lessons/${lesson.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
          });

          console.log(`Discount expired for lesson: ${lesson.title}`);
        } catch (error) {
          console.error(
            `Error updating expired discount for lesson ${lesson.id}:`,
            error
          );
        }
      }

      // Reload lessons after updating
      if (expiredLessons.length > 0) {
        await this.fetchLessons();
      }
    },

    // Initialize price range based on actual lesson prices
    initializePriceRange: function () {
      if (this.lessons.length > 0) {
        const prices = this.lessons.map(lesson => 
          lesson.discounted ? this.calculateDiscountedPrice(lesson) : lesson.price
        );
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        
        // Only update if the calculated range makes sense
        if (minPrice >= 800 && maxPrice <= 2100 && minPrice <= maxPrice) {
          this.priceRange = [minPrice, maxPrice];
        }
      }
    }
  },

  // Lifecycle hook - fetch lessons when app loads
  async created() {
    // A. GET - Fetch all lessons from backend
    await this.fetchLessons();

    // Initialize price range based on actual lesson prices
    this.initializePriceRange();

    // Check for expired discounts
    await this.checkExpiredDiscounts();
  },
});
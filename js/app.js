let webstore = new Vue({
    el: "#app",
    data: {
        showCartPage: false,
        cartCount: 0,
        cart: [],
        currentSlide: 0,
        selectedCategory: "All",
        priceRange: [20, 60],
        sortBy: "subject",
        sortOrder: "asc",
        searchQuery: "",
        userRegion: "",
        serviceFee: 5,
        // Child Info Modal Data
        selectedLesson: null,
        childInfo: {
            name: "",
            age: "",
            selectedDay: ""
        },
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        regionDistances: {
            North: { North: 0, Central: 1, East: 2, West: 2, South: 3 },
            South: { South: 0, Central: 1, East: 2, West: 2, North: 3 },
            Central: { Central: 0, North: 1, South: 1, East: 1, West: 1 },
            East: { East: 0, Central: 1, North: 2, South: 2, West: 3 },
            West: { West: 0, Central: 1, North: 2, South: 2, East: 3 },
        },
        lessons: [
            {
                id: "1",
                subject: "Mathematics",
                title: "Algebra Basics",
                location: "North, Grand Baie Education Center",
                price: 45,
                spaces: 15,
                initialSpaces: 15,
                sessions: 2,
                description: "Learn fundamental algebra concepts and problem-solving techniques",
                category: "School Classes",
                professor: "Mr. David Chen",
                rating: 5,
                discounted: false,
                students: ["John Smith", "Sarah Wilson", "Mike Johnson"],
            },
            {
                id: "2",
                subject: "Mathematics",
                title: "Geometry & Problem Solving",
                location: "Central, Curepipe Learning Hub",
                price: 40,
                spaces: 12,
                initialSpaces: 12,
                sessions: 2,
                description: "Explore geometric shapes and develop logical thinking skills",
                category: "School Classes",
                professor: "Ms. Sarah Lee",
                rating: 4,
                discounted: false,
                students: ["Emma Davis", "James Brown"],
            },
            {
                id: "3",
                subject: "Physics",
                title: "Forces & Motion",
                location: "Central, Quatre Bornes Science Center",
                price: 50,
                spaces: 10,
                initialSpaces: 10,
                sessions: 3,
                description: "Understand the laws of motion and forces in our world",
                category: "School Classes",
                professor: "Dr. Ahmed Hassan",
                rating: 5,
                discounted: true,
                discountPercent: 15,
                discountStart: "2025-11-15",
                discountEnd: "2025-11-25",
                students: ["Lisa Wong", "Kevin Martin", "Anna Kowalski"],
            },
            {
                id: "4",
                subject: "Physics",
                title: "Electricity & Magnetism",
                location: "Central, Rose Hill Tech Lab",
                price: 55,
                spaces: 8,
                initialSpaces: 8,
                sessions: 3,
                description: "Discover the wonders of electricity and magnetic fields",
                category: "School Classes",
                professor: "Dr. Priya Sharma",
                rating: 4,
                discounted: false,
                students: ["Tom Wilson", "Sophie Martin"],
            },
            {
                id: "5",
                subject: "Chemistry",
                title: "Atoms & Molecules",
                location: "Central, Vacoas Science Lab",
                price: 48,
                spaces: 10,
                initialSpaces: 10,
                sessions: 2,
                description: "Learn about atomic structure and chemical bonding",
                category: "School Classes",
                professor: "Mr. Kevin Martin",
                rating: 5,
                discounted: true,
                discountPercent: 20,
                discountStart: "2025-11-10",
                discountEnd: "2025-11-20",
                students: ["David Chen", "Maria Rodriguez", "Raj Patel"],
            },
            {
                id: "6",
                subject: "Biology",
                title: "Human Body Systems",
                location: "Central, Phoenix Biology Lab",
                price: 42,
                spaces: 14,
                initialSpaces: 14,
                sessions: 2,
                description: "Explore the amazing systems that make up our bodies",
                category: "School Classes",
                professor: "Ms. Lisa Wong",
                rating: 4,
                discounted: false,
                students: ["Chloe Taylor", "Thomas Brown"],
            },
            {
                id: "7",
                subject: "English",
                title: "Grammar & Writing Skills",
                location: "North, Grand Baie Language Center",
                price: 35,
                spaces: 18,
                initialSpaces: 18,
                sessions: 2,
                description: "Improve your English grammar and writing abilities",
                category: "School Classes",
                professor: "Mrs. Maria Rodriguez",
                rating: 5,
                discounted: false,
                students: ["Isabella Rossi", "Carlos Mendez"],
            },
            {
                id: "8",
                subject: "History",
                title: "Ancient Civilizations",
                location: "South, Mahebourg History Room",
                price: 38,
                spaces: 12,
                initialSpaces: 12,
                sessions: 1,
                description: "Journey through ancient civilizations and their cultures",
                category: "School Classes",
                professor: "Mr. James Wilson",
                rating: 4,
                discounted: true,
                discountPercent: 25,
                discountStart: "2025-11-18",
                discountEnd: "2025-11-28",
                students: ["Emma Watson", "Michael Johnson"],
            },
            {
                id: "9",
                subject: "Geography",
                title: "Maps & Climate",
                location: "North, Triolet Learning Center",
                price: 36,
                spaces: 15,
                initialSpaces: 15,
                sessions: 1,
                description: "Learn map reading and understand global climate patterns",
                category: "School Classes",
                professor: "Ms. Anna Kowalski",
                rating: 4,
                discounted: false,
                students: ["Sophie Dubois", "Kenji Tanaka"],
            },
            {
                id: "10",
                subject: "Computer Science",
                title: "Coding Fundamentals",
                location: "Central, Ebene Digital Hub",
                price: 52,
                spaces: 10,
                initialSpaces: 10,
                sessions: 3,
                description: "Start your coding journey with basic programming concepts",
                category: "School Classes",
                professor: "Mr. Raj Patel",
                rating: 5,
                discounted: false,
                students: ["John Smith", "Sarah Wilson"],
            },
            {
                id: "11",
                subject: "French",
                title: "Everyday Conversation",
                location: "Central, Curepipe Language Center",
                price: 32,
                spaces: 16,
                initialSpaces: 16,
                sessions: 2,
                description: "Practice everyday French conversation and vocabulary",
                category: "School Classes",
                professor: "Madame Sophie Dubois",
                rating: 5,
                discounted: true,
                discountPercent: 10,
                discountStart: "2025-11-12",
                discountEnd: "2025-11-22",
                students: ["Emma Davis", "James Brown", "Lisa Wong"],
            },
            {
                id: "12",
                subject: "Dance",
                title: "Hip-Hop Moves",
                location: "West, Port Louis Dance Studio",
                price: 28,
                spaces: 20,
                initialSpaces: 20,
                sessions: 2,
                description: "Learn cool hip-hop dance moves and choreography",
                category: "Activities",
                professor: "Ms. Chloe Taylor",
                rating: 5,
                discounted: false,
                students: ["Mike Johnson", "Anna Kowalski"],
            },
            {
                id: "13",
                subject: "Dance",
                title: "Ballet Techniques",
                location: "Central, Quatre Bornes Dance Academy",
                price: 30,
                spaces: 15,
                initialSpaces: 15,
                sessions: 2,
                description: "Master classical ballet techniques and positions",
                category: "Activities",
                professor: "Ms. Isabella Rossi",
                rating: 4,
                discounted: false,
                students: ["Tom Wilson", "Sophie Martin"],
            },
            {
                id: "14",
                subject: "Painting",
                title: "Watercolor Landscapes",
                location: "Central, Rose Hill Art Room",
                price: 25,
                spaces: 12,
                initialSpaces: 12,
                sessions: 1,
                description: "Create beautiful landscapes using watercolor techniques",
                category: "Activities",
                professor: "Mr. Thomas Brown",
                rating: 5,
                discounted: true,
                discountPercent: 30,
                discountStart: "2025-11-14",
                discountEnd: "2025-11-24",
                students: ["David Chen", "Maria Rodriguez"],
            },
            {
                id: "15",
                subject: "Music",
                title: "Guitar for Beginners",
                location: "Central, Phoenix Music Room",
                price: 40,
                spaces: 8,
                initialSpaces: 8,
                sessions: 2,
                description: "Learn basic guitar chords and play your first songs",
                category: "Activities",
                professor: "Mr. Carlos Mendez",
                rating: 4,
                discounted: false,
                students: ["Raj Patel", "Chloe Taylor"],
            },
            {
                id: "16",
                subject: "Drama",
                title: "Acting & Improvisation",
                location: "Central, Curepipe Drama Hall",
                price: 32,
                spaces: 14,
                initialSpaces: 14,
                sessions: 2,
                description: "Develop acting skills through fun improvisation games",
                category: "Activities",
                professor: "Ms. Emma Watson",
                rating: 5,
                discounted: false,
                students: ["Thomas Brown", "Isabella Rossi"],
            },
            {
                id: "17",
                subject: "Sports",
                title: "Football Training",
                location: "Central, Vacoas Sports Field",
                price: 22,
                spaces: 25,
                initialSpaces: 25,
                sessions: 3,
                description: "Improve football skills with professional coaching",
                category: "Activities",
                professor: "Coach Michael Johnson",
                rating: 4,
                discounted: false,
                students: ["Carlos Mendez", "Kenji Tanaka"],
            },
            {
                id: "18",
                subject: "Martial Arts",
                title: "Karate Basics",
                location: "North, Grand Baie Dojo",
                price: 35,
                spaces: 16,
                initialSpaces: 16,
                sessions: 2,
                description: "Learn basic karate moves and self-defense techniques",
                category: "Activities",
                professor: "Sensei Kenji Tanaka",
                rating: 5,
                discounted: true,
                discountPercent: 15,
                discountStart: "2025-11-16",
                discountEnd: "2025-11-26",
                students: ["Sophie Dubois", "John Smith"],
            },
        ],
    },
    computed: {
        // Check if child info is valid for form submission
        isChildInfoValid: function() {
            return this.childInfo.name.trim() !== '' && 
                   this.childInfo.age !== '' && 
                   this.childInfo.age >= 5 && 
                   this.childInfo.age <= 18 && 
                   this.childInfo.selectedDay !== '';
        },

        discountedLessons: function () {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // First, update discounted status for all lessons
            this.lessons.forEach(function (lesson) {
                if (lesson.discounted) {
                    const discountEnd = new Date(lesson.discountEnd);
                    discountEnd.setHours(23, 59, 59, 999);

                    if (discountEnd < today) {
                        lesson.discounted = false;
                    }
                }
            });

            const discountedLessons = this.lessons.filter(function (lesson) {
                if (!lesson.discounted) {
                    return false;
                }

                const discountEnd = new Date(lesson.discountEnd);
                discountEnd.setHours(23, 59, 59, 999);

                return discountEnd >= today;
            });

            const lessonsWithDaysLeft = discountedLessons.map(function (lesson) {
                const discountEnd = new Date(lesson.discountEnd);
                discountEnd.setHours(23, 59, 59, 999);

                const timeDiff = discountEnd.getTime() - today.getTime();
                const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                return {
                    ...lesson,
                    daysLeft: Math.max(0, daysLeft),
                };
            });

            lessonsWithDaysLeft.sort(function (a, b) {
                return a.daysLeft - b.daysLeft;
            });

            return lessonsWithDaysLeft;
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
                    const matchesSearch =
                        this.searchQuery === "" ||
                        lesson.title
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase()) ||
                        lesson.subject
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase()) ||
                        lesson.professor
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase());

                    return matchesCategory && matchesPrice && matchesSearch;
                }.bind(this)
            );

            return filtered;
        },

        filteredLessons: function () {
            let filtered = this.lessons.filter(
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
                    const matchesSearch =
                        this.searchQuery === "" ||
                        lesson.title
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase()) ||
                        lesson.subject
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase()) ||
                        lesson.professor
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase());

                    return matchesCategory && matchesPrice && matchesSearch;
                }.bind(this)
            );

            filtered.sort(
                function (a, b) {
                    let valueA;
                    let valueB;

                    if (this.sortBy === "subject") {
                        valueA = a.subject.toLowerCase();
                        valueB = b.subject.toLowerCase();
                    } else if (this.sortBy === "location") {
                        if (this.userRegion && this.userRegion !== "") {
                            const regionA = this.extractRegion(a.location);
                            const regionB = this.extractRegion(b.location);

                            const distanceA =
                                this.regionDistances[this.userRegion][regionA] ?? 99;
                            const distanceB =
                                this.regionDistances[this.userRegion][regionB] ?? 99;

                            // Compare by distance first
                            if (distanceA !== distanceB) {
                                return this.sortOrder === "asc"
                                    ? distanceA - distanceB
                                    : distanceB - distanceA;
                            }

                            // If same distance, compare alphabetically by location
                            return this.getLocationDisplay(a.location)
                                .toLowerCase()
                                .localeCompare(
                                    this.getLocationDisplay(b.location).toLowerCase()
                                );
                        } else {
                            // Default alphabetical sort when no region selected
                            return this.sortOrder === "asc"
                                ? a.location
                                    .toLowerCase()
                                    .localeCompare(b.location.toLowerCase())
                                : b.location
                                    .toLowerCase()
                                    .localeCompare(a.location.toLowerCase());
                        }
                    } else if (this.sortBy === "price") {
                        valueA = a.discounted ? this.calculateDiscountedPrice(a) : a.price;
                        valueB = b.discounted ? this.calculateDiscountedPrice(b) : b.price;
                    } else if (this.sortBy === "spaces") {
                        valueA = a.spaces;
                        valueB = b.spaces;
                    } else {
                        valueA = a.subject.toLowerCase();
                        valueB = b.subject.toLowerCase();
                    }

                    if (this.sortOrder === "asc") {
                        // For ascending order: lower values come first
                        if (valueA < valueB) {
                            return -1;
                        }
                        if (valueA > valueB) {
                            return 1;
                        }
                        return 0;
                    } else {
                        // For descending order: higher values come first
                        if (valueA > valueB) {
                            return -1;
                        }
                        if (valueA < valueB) {
                            return 1;
                        }
                        return 0;
                    }
                }.bind(this)
            );

            return filtered;
        },
    },
    methods: {
        // Toggle between store and cart page
        toggleCartPage: function() {
            this.showCartPage = !this.showCartPage;
        },

        // Open the child info modal
        openChildModal: function (lesson) {
            if (lesson.spaces > 0) {
                this.selectedLesson = lesson;
                // Reset child info
                this.childInfo = {
                    name: "",
                    age: "",
                    selectedDay: ""
                };
                // Show the modal using Bootstrap
                var modal = new bootstrap.Modal(document.getElementById('childInfoModal'));
                modal.show();
            }
        },

        // Confirm and add to cart
        confirmAddToCart: function () {
            if (this.selectedLesson && this.selectedLesson.spaces > 0 && this.isChildInfoValid) {
                // Decrement spaces
                this.selectedLesson.spaces--;
                
                // Add child name to lesson's students array
                this.selectedLesson.students.push(this.childInfo.name);
                
                // Add to cart with child info
                this.cart.push({
                    lessonId: this.selectedLesson.id,
                    lessonTitle: this.selectedLesson.title,
                    price: this.selectedLesson.discounted ? this.calculateDiscountedPrice(this.selectedLesson) : this.selectedLesson.price,
                    childName: this.childInfo.name,
                    childAge: this.childInfo.age,
                    selectedDay: this.childInfo.selectedDay,
                    sessions: this.selectedLesson.sessions
                });
                
                // Update cart count
                this.cartCount++;
                
                console.log("Added to cart:", this.selectedLesson.title);
                console.log("Child info:", this.childInfo);
                console.log("Spaces left:", this.selectedLesson.spaces);
                console.log("Cart items:", this.cart);
                
                // Close the modal
                var modal = bootstrap.Modal.getInstance(document.getElementById('childInfoModal'));
                modal.hide();
                
                // Reset selected lesson
                this.selectedLesson = null;
            }
        },

        // Remove item from cart
        removeFromCart: function(index) {
            const item = this.cart[index];
            
            // Find the lesson and restore the space
            const lesson = this.getLessonById(item.lessonId);
            if (lesson) {
                lesson.spaces++;
                
                // Remove child name from lesson's students array
                const studentIndex = lesson.students.indexOf(item.childName);
                if (studentIndex > -1) {
                    lesson.students.splice(studentIndex, 1);
                }
            }
            
            // Remove from cart
            this.cart.splice(index, 1);
            this.cartCount--;
            
            console.log("Removed from cart:", item.lessonTitle);
            console.log("Spaces restored for:", lesson.title, "New spaces:", lesson.spaces);
        },

        // Get lesson by ID
        getLessonById: function(lessonId) {
            return this.lessons.find(lesson => lesson.id === lessonId) || {};
        },

        // Calculate subtotal
        calculateSubtotal: function() {
            return this.cart.reduce((total, item) => total + item.price, 0);
        },

        // Calculate total with service fee
        calculateTotal: function() {
            return this.calculateSubtotal() + this.serviceFee;
        },

        // Generate receipt number
        generateReceiptNumber: function() {
            return Math.random().toString(36).substr(2, 9).toUpperCase();
        },

        // Get current date
        getCurrentDate: function() {
            return new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

        // Checkout function
        checkout: function() {
            if (this.cart.length > 0) {
                alert('Checkout completed! Your classes have been booked successfully.');
                // Here you would typically send the cart data to a server
                console.log('Checkout completed with items:', this.cart);
                
                // Clear cart after successful checkout
                this.cart = [];
                this.cartCount = 0;
                this.showCartPage = false;
            }
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

            const discountStart = new Date(lesson.discountStart);
            const discountEnd = new Date(lesson.discountEnd);
            const totalDays = Math.ceil(
                (discountEnd - discountStart) / (1000 * 60 * 60 * 24)
            );
            const daysLeft = lesson.daysLeft;
            const percentageLeft = (daysLeft / totalDays) * 100;

            // Priority: Last day (0 days) should be red, then check percentage
            if (daysLeft === 0) return "red";
            if (percentageLeft <= 25) return "red";
            if (percentageLeft <= 50) return "orange";
            return "green";
        },

        getSpacesUrgencyClass: function (lesson) {
            const percentageLeft = (lesson.spaces / lesson.initialSpaces) * 100;

            if (percentageLeft <= 25) return "red";
            if (percentageLeft <= 50) return "orange";
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

        updatePriceRange: function () {
            if (this.priceRange[0] > this.priceRange[1]) {
                this.priceRange[0] = this.priceRange[1];
            }
            if (this.priceRange[1] < this.priceRange[0]) {
                this.priceRange[1] = this.priceRange[0];
            }
        },

        toggleSortOrder: function () {
            if (this.sortOrder === "asc") {
                this.sortOrder = "desc";
            } else {
                this.sortOrder = "asc";
            }
        },
    },

    // Lifecycle hook to check discount status when app loads
    created: function () {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        this.lessons.forEach(function (lesson) {
            if (lesson.discounted) {
                const discountEnd = new Date(lesson.discountEnd);
                discountEnd.setHours(23, 59, 59, 999);

                if (discountEnd < today) {
                    lesson.discounted = false;
                }
            }
        });
    },
});
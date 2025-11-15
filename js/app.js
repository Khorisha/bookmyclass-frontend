let webstore = new Vue({
    el: "#app",
    data: {
        cartCount: 0,
        cart: [],
        currentSlide: 0,
        lessons: [
            {
                id: "1",
                subject: "Mathematics",
                title: "Algebra Basics",
                location: "Port Louis Education Center",
                price: 45,
                spaces: 15,
                initialSpaces: 15,
                icon: "fa-calculator",
                description: "Learn fundamental algebra concepts and problem-solving techniques",
                category: "School Classes",
                professor: "Mr. David Chen",
                rating: 5,
                discounted: false,
                students: []
            },
            {
                id: "2",
                subject: "Mathematics",
                title: "Geometry & Problem Solving",
                location: "Curepipe Learning Hub",
                price: 40,
                spaces: 12,
                initialSpaces: 12,
                icon: "fa-shapes",
                description: "Explore geometric shapes and develop logical thinking skills",
                category: "School Classes",
                professor: "Ms. Sarah Lee",
                rating: 4,
                discounted: false,
                students: []
            },
            {
                id: "3",
                subject: "Physics",
                title: "Forces & Motion",
                location: "Quatre Bornes Science Center",
                price: 50,
                spaces: 10,
                initialSpaces: 10,
                icon: "fa-atom",
                description: "Understand the laws of motion and forces in our world",
                category: "School Classes",
                professor: "Dr. Ahmed Hassan",
                rating: 5,
                discounted: true,
                discountPercent: 15,
                discountStart: "2025-11-15",
                discountEnd: "2025-11-25",
                students: []
            },
            {
                id: "4",
                subject: "Physics",
                title: "Electricity & Magnetism",
                location: "Rose Hill Tech Lab",
                price: 55,
                spaces: 8,
                initialSpaces: 8,
                icon: "fa-bolt",
                description: "Discover the wonders of electricity and magnetic fields",
                category: "School Classes",
                professor: "Dr. Priya Sharma",
                rating: 4,
                discounted: false,
                students: []
            },
            {
                id: "5",
                subject: "Chemistry",
                title: "Atoms & Molecules",
                location: "Vacoas Science Lab",
                price: 48,
                spaces: 10,
                initialSpaces: 10,
                icon: "fa-flask",
                description: "Learn about atomic structure and chemical bonding",
                category: "School Classes",
                professor: "Mr. Kevin Martin",
                rating: 5,
                discounted: true,
                discountPercent: 20,
                discountStart: "2025-11-10",
                discountEnd: "2025-11-20",
                students: []
            },
            {
                id: "6",
                subject: "Biology",
                title: "Human Body Systems",
                location: "Phoenix Biology Lab",
                price: 42,
                spaces: 14,
                initialSpaces: 14,
                icon: "fa-heart",
                description: "Explore the amazing systems that make up our bodies",
                category: "School Classes",
                professor: "Ms. Lisa Wong",
                rating: 4,
                discounted: false,
                students: []
            },
            {
                id: "7",
                subject: "English",
                title: "Grammar & Writing Skills",
                location: "Grand Baie Language Center",
                price: 35,
                spaces: 18,
                initialSpaces: 18,
                icon: "fa-pen-fancy",
                description: "Improve your English grammar and writing abilities",
                category: "School Classes",
                professor: "Mrs. Maria Rodriguez",
                rating: 5,
                discounted: false,
                students: []
            },
            {
                id: "8",
                subject: "History",
                title: "Ancient Civilizations",
                location: "Mahebourg History Room",
                price: 38,
                spaces: 12,
                initialSpaces: 12,
                icon: "fa-monument",
                description: "Journey through ancient civilizations and their cultures",
                category: "School Classes",
                professor: "Mr. James Wilson",
                rating: 4,
                discounted: true,
                discountPercent: 25,
                discountStart: "2025-11-18",
                discountEnd: "2025-11-28",
                students: []
            },
            {
                id: "9",
                subject: "Geography",
                title: "Maps & Climate",
                location: "Triolet Learning Center",
                price: 36,
                spaces: 15,
                initialSpaces: 15,
                icon: "fa-globe-americas",
                description: "Learn map reading and understand global climate patterns",
                category: "School Classes",
                professor: "Ms. Anna Kowalski",
                rating: 4,
                discounted: false,
                students: []
            },
            {
                id: "10",
                subject: "Computer Science",
                title: "Coding Fundamentals",
                location: "Ebene Digital Hub",
                price: 52,
                spaces: 10,
                initialSpaces: 10,
                icon: "fa-code",
                description: "Start your coding journey with basic programming concepts",
                category: "School Classes",
                professor: "Mr. Raj Patel",
                rating: 5,
                discounted: false,
                students: []
            },
            {
                id: "11",
                subject: "French",
                title: "Everyday Conversation",
                location: "Curepipe Language Center",
                price: 32,
                spaces: 16,
                initialSpaces: 16,
                icon: "fa-language",
                description: "Practice everyday French conversation and vocabulary",
                category: "School Classes",
                professor: "Madame Sophie Dubois",
                rating: 5,
                discounted: true,
                discountPercent: 10,
                discountStart: "2025-11-12",
                discountEnd: "2025-11-22",
                students: []
            },
            {
                id: "12",
                subject: "Dance",
                title: "Hip-Hop Moves",
                location: "Port Louis Dance Studio",
                price: 28,
                spaces: 20,
                initialSpaces: 20,
                icon: "fa-music",
                description: "Learn cool hip-hop dance moves and choreography",
                category: "Activities",
                professor: "Ms. Chloe Taylor",
                rating: 5,
                discounted: false,
                students: []
            },
            {
                id: "13",
                subject: "Dance",
                title: "Ballet Techniques",
                location: "Quatre Bornes Dance Academy",
                price: 30,
                spaces: 15,
                initialSpaces: 15,
                icon: "fa-user",
                description: "Master classical ballet techniques and positions",
                category: "Activities",
                professor: "Ms. Isabella Rossi",
                rating: 4,
                discounted: false,
                students: []
            },
            {
                id: "14",
                subject: "Painting",
                title: "Watercolor Landscapes",
                location: "Rose Hill Art Room",
                price: 25,
                spaces: 12,
                initialSpaces: 12,
                icon: "fa-palette",
                description: "Create beautiful landscapes using watercolor techniques",
                category: "Activities",
                professor: "Mr. Thomas Brown",
                rating: 5,
                discounted: true,
                discountPercent: 30,
                discountStart: "2025-11-14",
                discountEnd: "2025-11-24",
                students: []
            },
            {
                id: "15",
                subject: "Music",
                title: "Guitar for Beginners",
                location: "Phoenix Music Room",
                price: 40,
                spaces: 8,
                initialSpaces: 8,
                icon: "fa-guitar",
                description: "Learn basic guitar chords and play your first songs",
                category: "Activities",
                professor: "Mr. Carlos Mendez",
                rating: 4,
                discounted: false,
                students: []
            },
            {
                id: "16",
                subject: "Drama",
                title: "Acting & Improvisation",
                location: "Curepipe Drama Hall",
                price: 32,
                spaces: 14,
                initialSpaces: 14,
                icon: "fa-theater-masks",
                description: "Develop acting skills through fun improvisation games",
                category: "Activities",
                professor: "Ms. Emma Watson",
                rating: 5,
                discounted: false,
                students: []
            },
            {
                id: "17",
                subject: "Sports",
                title: "Football Training",
                location: "Vacoas Sports Field",
                price: 22,
                spaces: 25,
                initialSpaces: 25,
                icon: "fa-futbol",
                description: "Improve football skills with professional coaching",
                category: "Activities",
                professor: "Coach Michael Johnson",
                rating: 4,
                discounted: false,
                students: []
            },
            {
                id: "18",
                subject: "Martial Arts",
                title: "Karate Basics",
                location: "Grand Baie Dojo",
                price: 35,
                spaces: 16,
                initialSpaces: 16,
                icon: "fa-user-ninja",
                description: "Learn basic karate moves and self-defense techniques",
                category: "Activities",
                professor: "Sensei Kenji Tanaka",
                rating: 5,
                discounted: true,
                discountPercent: 15,
                discountStart: "2025-11-16",
                discountEnd: "2025-11-26",
                students: []
            }
        ]
    },
    computed: {
        discountedLessons() {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const discounted = this.lessons
                .filter(lesson => {
                    if (!lesson.discounted) return false;
                    
                    const discountEnd = new Date(lesson.discountEnd);
                    discountEnd.setHours(23, 59, 59, 999);
                    
                    return discountEnd >= today;
                })
                .map(lesson => {
                    const discountEnd = new Date(lesson.discountEnd);
                    discountEnd.setHours(23, 59, 59, 999);
                    
                    const timeDiff = discountEnd.getTime() - today.getTime();
                    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                    
                    return {
                        ...lesson,
                        daysLeft: Math.max(0, daysLeft)
                    };
                })
                .sort((a, b) => a.daysLeft - b.daysLeft);
            
            return discounted;
        }
    },
    methods: {
        addToCart(lesson) {
            if (lesson.spaces > 0) {
                lesson.spaces--;
                this.cartCount++;
                
                this.cart.push({
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    price: lesson.price
                });
                
                console.log('Added to cart:', lesson.title);
                console.log('Spaces left:', lesson.spaces);
            }
        },
        
        calculateDiscountedPrice(lesson) {
            return Math.round(lesson.price * (1 - lesson.discountPercent / 100));
        },
        
        getUrgencyClass(daysLeft) {
            if (daysLeft <= 1) return 'red';
            if (daysLeft <= 3) return 'orange';
            return 'green';
        },
        
        getDaysText(daysLeft) {
            if (daysLeft === 0) return 'Last day';
            if (daysLeft === 1) return '1 day left';
            return `${daysLeft} days left`;
        },
        
        prevSlide() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
            }
        },
        
        nextSlide() {
            if (this.currentSlide < this.discountedLessons.length - 1) {
                this.currentSlide++;
            }
        }
    }
});
# Rivercrest FMC Landing Page - TODO

## Completed Features
- [x] Hero section with brand story
- [x] Service cards from featured content
- [x] Social proof with member testimonials
- [x] Contact form with location info
- [x] Modern Spiritual Minimalism design
- [x] Responsive navigation
- [x] Professional footer

## Completed Features (continued)
- [x] Giving/Donations page (simplified - no payment processing)
  - [x] Design donations page layout
  - [x] Create donation type selection UI (tithe, offering, special projects)
  - [x] Add donation amount options
  - [x] Build contact form for donor information
  - [x] Create confirmation message
  - [x] Add route and navigation link

## Future Features
- [ ] Events Calendar with filtering
- [ ] Prayer Request Form with email notifications
- [ ] Admin dashboard for managing donations
- [ ] Email receipts for donors
- [ ] Recurring donation support
- [ ] Anonymous giving option

## Completed Features (Center of Studies)
- [x] Database schema for courses, applications, and student progress
  - [x] Create courses table with track types
  - [x] Create applications table
  - [x] Create student_progress table
  - [x] Create course_sessions table
- [x] Public Center of Studies overview page
  - [x] Display four training tracks
  - [x] Build application form
  - [x] Validate and store applications
- [x] Protected student dashboard
  - [x] Display enrolled courses
  - [x] Show progress tracking
  - [x] List available course syllabuses
- [x] Course syllabuses page
  - [x] Display course descriptions
  - [x] Show session details and commitments
  - [x] Access control for enrolled students
- [x] Authentication integration
  - [x] Protect student pages with login requirement
  - [x] Link applications to user accounts
  - [x] Test login flows

## In Progress - Admin Dashboard
- [ ] Add admin database queries and tRPC procedures
  - [ ] Get all applications with filtering
  - [ ] Update application status
  - [ ] Get all courses and sessions
  - [ ] Create/update/delete courses
  - [ ] Get all enrollments and progress
- [ ] Build admin dashboard layout
  - [ ] Create admin navigation
  - [ ] Build dashboard overview
  - [ ] Add role-based access control
- [ ] Application management section
  - [ ] List all applications
  - [ ] Review application details
  - [ ] Approve/reject applications
  - [ ] Filter by status and track
- [ ] Course management section
  - [ ] List all courses
  - [ ] Create new courses
  - [ ] Edit course details
  - [ ] Manage course sessions
- [ ] Student progress tracking
  - [ ] View all students
  - [ ] Track enrollment status
  - [ ] Monitor session completion
  - [ ] Generate progress reports


## In Progress - Mission Statement Integration
- [ ] Add "The Abrahamic Root" mission statement to landing page
  - [ ] Create mission statement section with theological content
  - [ ] Display Genesis 12:3 and Psalm 22:27-28 passages
  - [ ] Integrate into Center of Studies overview
  - [ ] Add to student orientation materials


## Completed - Course Registration with Printed Materials
- [x] Add database schema for course registrations
  - [x] Create registrations table with student info
  - [x] Add printed materials flag and payment status
  - [x] Track registration date and payment amount
- [x] Build student course registration form
  - [x] Collect student contact information
  - [x] Add printed materials option ($45 USA only)
  - [x] Show payment instructions
  - [x] Confirmation message after registration
- [x] Add tRPC procedures for course registration
  - [x] registerForCourse mutation with USA validation
  - [x] getCourseRegistrationsByCourse query
  - [x] Admin getAllCourseRegistrations query
  - [x] Admin updateCourseRegistrationPaymentStatus mutation
- [x] Write comprehensive vitest tests
  - [x] Test registration creation with/without materials
  - [x] Test payment status transitions
  - [x] Test USA country validation
  - [x] Test printed materials cost calculation
- [ ] Add admin interface for registrations (future)
  - [ ] View all course registrations
  - [ ] Filter by course and payment status
  - [ ] Export registration list
  - [ ] Mark payments as received


## Completed - Email Notifications for Course Registration
- [x] Set up email service integration
  - [x] Configure Resend email provider
  - [x] Add RESEND_API_KEY environment variable
  - [x] Create email helper functions in server/_core/email.ts
- [x] Create email templates
  - [x] Registration confirmation template with course details
  - [x] Payment instructions for printed materials ($45 USA only)
  - [x] Admin notification template with payment alerts
- [x] Implement email sending
  - [x] Send confirmation on successful registration
  - [x] Include course details and student info in email
  - [x] Add payment instructions for printed materials
  - [x] Handle email errors gracefully with logging
- [x] Test email functionality
  - [x] Verify emails send on successful registration (8 tests passing)
  - [x] Test with/without printed materials
  - [x] Test error handling and Resend API validation



## Completed - Center of Studies Resources Page
- [x] Upload PDF resources to S3
  - [x] Upload Swahili Book of Discipline PDF (2.1 MB)
  - [x] Get CDN URLs for resources
- [x] Create database schema for resources
  - [x] Add resources table with title, description, file URL, category
  - [x] Add resource categories (Books, Syllabuses, Guidelines, Articles, Other)
  - [x] Add language field for multi-language support
- [x] Build Resources Page
  - [x] Create Resources component with resource listings
  - [x] Add category filtering with button toggles
  - [x] Display resource descriptions and download links
  - [x] Responsive grid layout (mobile, tablet, desktop)
  - [x] File size formatting and metadata display
- [x] Integrate with navigation
  - [x] Add Resources link to Center of Studies navigation
  - [x] Add /resources route to App.tsx
- [x] Backend API
  - [x] Create tRPC procedures for resource queries
  - [x] getAllResources, getResourcesByCategory, getResourceById
  - [x] Admin procedures for creating/updating/deleting resources
- [x] Testing
  - [x] 13 comprehensive vitest tests (all passing)
  - [x] Tests cover creation, retrieval, filtering, and metadata
  - [x] Verified Swahili Book of Discipline is in database
  - [ ] Test on mobile devices


## Completed - Email Notification Feature Showcase
- [x] Create showcase webpage
  - [x] Design layout with feature highlights
  - [x] Generate email mockup images (student & admin)
  - [x] Add interactive demo section with tab switching
  - [x] Showcase benefits and use cases
- [x] Build showcase component
  - [x] Create EmailNotificationShowcase page (EmailNotificationShowcase.tsx)
  - [x] Add to navigation (/email-notifications route)
  - [x] Responsive design for all devices
  - [x] Professional hero section with CTAs
- [x] Integration
  - [x] Link from Center of Studies page (Features nav link)
  - [x] Add to App.tsx routing
  - [x] Test all interactive elements
  - [x] All 34 tests passing


## In Progress - Stripe Payment Gateway Integration
- [ ] Set up Stripe integration
  - [ ] Add Stripe to webdev features
  - [ ] Configure Stripe API keys (test mode)
  - [ ] Set up webhook endpoint
- [ ] Database schema for payments
  - [ ] Create payments table with transaction details
  - [ ] Link payments to course registrations
  - [ ] Track payment status and dates
- [ ] Payment checkout flow
  - [ ] Create checkout page component
  - [ ] Implement Stripe Checkout Session creation
  - [ ] Add payment confirmation page
  - [ ] Update registration with payment status
- [ ] Webhook handling
  - [ ] Implement /api/stripe/webhook endpoint
  - [ ] Handle payment_intent.succeeded events
  - [ ] Update registration payment status
  - [ ] Send confirmation emails
- [ ] Testing
  - [ ] Test checkout flow with test card
  - [ ] Verify webhook processing
  - [ ] Test payment status updates


## In Progress - Free Methodist Way Independent Study Integration
- [ ] Create independent study module database schema
  - [ ] Add independent_study_modules table
  - [ ] Add module_progress tracking table
  - [ ] Link modules to training tracks and courses
- [ ] Add Free Methodist Way doctrinal content
  - [ ] Create 12 core doctrinal modules (Trinity, Scripture, Humanity, etc.)
  - [ ] Add Swahili language support for all modules
  - [ ] Create study guides and reflection questions
- [ ] Integrate modules into training tracks
  - [ ] Link to Deacon Formation track
  - [ ] Link to Evangelist Training track
  - [ ] Link to Pastor Formation track
  - [ ] Link to Leadership Development track
  - [ ] Link to Lay Ministry track
- [ ] Build independent study UI
  - [ ] Create module listing page
  - [ ] Add progress tracking dashboard
  - [ ] Create module detail and study page
  - [ ] Add completion certificates
- [ ] Test and deploy
  - [ ] Write integration tests
  - [ ] Verify all tracks have access to modules
  - [ ] Test progress tracking functionality

## Completed - Free Methodist Way Independent Study Integration
- [x] Create independent study module database schema
  - [x] Add independent_study_modules table with English/Swahili content
  - [x] Add module_progress tracking table for student progress
  - [x] Add track_module_links table for course associations
- [x] Add Free Methodist Way doctrinal content
  - [x] Create 11 core doctrinal modules (Trinity, Scripture, Humanity, etc.)
  - [x] Add Swahili language support for all modules
  - [x] Create study guides and reflection questions for each module
- [x] Create tRPC backend procedures
  - [x] getAllModules, getModuleById, getModulesByCategory queries
  - [x] getModulesForTrack, getRequiredModulesForTrack queries
  - [x] startModule, completeModule, updateModuleProgress mutations
  - [x] getUserModuleProgress, getUserCompletedModules queries
  - [x] issueCertificate mutation for completion certificates
- [x] Build independent study UI
  - [x] Create IndependentStudyModules.tsx listing page
  - [x] Add category filtering and search
  - [x] Display progress tracking for authenticated users
  - [x] Show completion status and certificates
- [ ] Integrate modules into training tracks (future)
  - [ ] Link modules to Deacon Formation track
  - [ ] Link modules to Evangelist Training track
  - [ ] Link modules to Pastor Formation track
  - [ ] Link modules to Leadership Development track
  - [ ] Link modules to Lay Ministry track
- [ ] Create module detail page (future)
  - [ ] Build ModuleDetail.tsx component
  - [ ] Add content display with bilingual support
  - [ ] Create progress tracking UI
  - [ ] Add reflection question responses
- [ ] Test and deploy
  - [ ] Write integration tests for module queries
  - [ ] Test progress tracking functionality
  - [ ] Verify certificate issuance

## In Progress - Module Detail Page with Bilingual Tabs
- [x] Create module detail page component
  - [x] Bilingual English/Swahili tabs
  - [x] Full module content display with Streamdown markdown rendering
  - [x] Module metadata (estimated time, category, language)
- [x] Add progress tracking functionality
  - [x] Progress slider for manual progress updates
  - [x] Update progress mutation
  - [x] Complete module button and mutation
  - [x] Display completion status
- [x] Implement reflection notes section
  - [x] Note-taking textarea for student reflections
  - [x] Save notes functionality
  - [x] Notes persist with progress data
- [x] Add navigation and routing
  - [x] Add /modules and /module/:moduleId routes to App.tsx
  - [x] Back button navigation
  - [x] Link from IndependentStudyModules to ModuleDetail
- [x] Build and test
  - [x] Project builds successfully
  - [x] All 34 tests passing
  - [x] TypeScript compilation successful



## Completed - PDF Certificate Generation
- [x] Design certificate template
  - [x] Create professional certificate design with church branding
  - [x] Add placeholder for student name, module title, completion date
  - [x] Professional layout with decorative borders and signature line
- [x] Create PDF generation service
  - [x] Set up PDFKit library for PDF generation
  - [x] Create generateCertificatePDF function in server/_core/certificate.ts
  - [x] Add dynamic text rendering for student/module data
  - [x] Generate unique certificate IDs for tracking
- [x] Add certificate download tRPC procedure
  - [x] Create downloadCertificate mutation in centerOfStudies router
  - [x] Return PDF file as base64 encoded string
  - [x] Verify module completion before allowing download
  - [x] Include proper error handling and authorization
- [x] Build certificate UI
  - [x] Add "Download Certificate" button to ModuleDetail page
  - [x] Show button only when module is completed
  - [x] Handle loading state with "Generating..." text
  - [x] Implement PDF download with proper filename
- [x] Test and deploy
  - [x] Project builds successfully with no errors
  - [x] All 34 tests passing
  - [x] Certificate generation tested with PDFKit
  - [x] Download functionality integrated with ModuleDetail page



## Completed - Automatic Certificate Email Delivery
- [x] Create certificate email service
  - [x] Add sendCertificateEmail function to email.ts
  - [x] Support PDF attachment in Resend API
  - [x] Create professional email template with certificate details
  - [x] Include certificate ID, completion date, and congratulatory message
- [x] Integrate with module completion
  - [x] Modify completeModule mutation to trigger email
  - [x] Generate PDF and send as attachment
  - [x] Handle email errors gracefully (non-blocking)
  - [x] Automatic certificate ID generation
- [x] Add email template
  - [x] Congratulatory message for completion
  - [x] Module details and completion date
  - [x] Certificate ID for verification
  - [x] Link to student dashboard
  - [x] Professional design matching church branding
- [x] Test email delivery
  - [x] Project builds successfully with no errors
  - [x] All 34 tests passing
  - [x] Certificate email integration verified
  - [x] Error handling tested for email failures


## Completed - FMC History and Polity Integration
- [x] Research and adapt course content
  - [x] Analyze existing FMC History and Polity curriculum
  - [x] Identify theological concepts to simplify for practical application
  - [x] Create bilingual (English/Swahili) content outlines
  - [x] Develop practical case studies and real-world examples
- [x] Create practical learning modules
  - [x] Module 1: FMC Origins and Founder (John Wesley and Free Methodist roots)
  - [x] Module 2: Core Beliefs and Values (Practical application for leaders)
  - [x] Module 3: Church Organization and Structure (How it works in practice)
  - [x] Module 4: Leadership Roles and Responsibilities (What leaders do)
- [x] Integrate into all training tracks
  - [x] Link to Deacon Formation track
  - [x] Link to Evangelist Training track
  - [x] Link to Pastor Formation track
  - [x] Link to Leadership Development track
  - [x] Link to Lay Ministry track
- [x] Database integration
  - [x] Create independent_study_modules table entries
  - [x] Create track_module_links for all 5 tracks
  - [x] Mark modules as required for all tracks
  - [x] Set bilingual language support


## In Progress - FMC Video Demonstrations with Swahili Subtitles
- [ ] Plan and script video demonstrations
  - [ ] Video 1: FMC Origins - John Wesley and Methodist Movement
  - [ ] Video 2: Core Beliefs - Authority of Scripture
  - [ ] Video 3: Holiness and Holy Living - Practical Examples
  - [ ] Video 4: Church Organization - How Decisions Are Made
  - [ ] Video 5: Leadership Roles - Pastor, Deacon, Lay Leader
  - [ ] Video 6: Social Justice - Caring for the Poor and Marginalized
- [ ] Generate video demonstrations
  - [ ] Create animated explainer videos for each topic
  - [ ] Add visual demonstrations of FMC practices
  - [ ] Include real-world church scenarios
- [ ] Create Swahili subtitles
  - [ ] Write Swahili subtitle scripts for each video
  - [ ] Generate subtitle files (SRT format)
  - [ ] Verify subtitle timing and accuracy
- [ ] Upload and integrate videos
  - [ ] Upload videos to S3 CDN
  - [ ] Create video entries in database
  - [ ] Link videos to corresponding modules
  - [ ] Add video players to module pages
- [ ] Test and validate
  - [ ] Test video playback on all devices
  - [ ] Verify subtitle synchronization
  - [ ] Test with Swahili-speaking users
  - [ ] Ensure accessibility (captions, descriptions)

## Completed - Free Methodist Way Independent Study Integration
- [x] Create independent study module database schema
  - [x] Add independent_study_modules table with English/Swahili content
  - [x] Add module_progress tracking table for student progress
  - [x] Add track_module_links table for course associations
- [x] Add Free Methodist Way doctrinal content
  - [x] Create 11 core doctrinal modules (Trinity, Scripture, Humanity, etc.)
  - [x] Add Swahili language support for all modules
  - [x] Create study guides and reflection questions for each module
- [x] Create tRPC backend procedures
  - [x] getAllModules, getModuleById, getModulesByCategory queries
  - [x] getModulesForTrack, getRequiredModulesForTrack queries
  - [x] startModule, completeModule, updateModuleProgress mutations
  - [x] getUserModuleProgress, getUserCompletedModules queries
  - [x] issueCertificate mutation for completion certificates
- [x] Build independent study UI
  - [x] Create IndependentStudyModules.tsx listing page
  - [x] Add category filtering and search
  - [x] Display progress tracking for authenticated users
  - [x] Show completion status and certificates
- [ ] Integrate modules into training tracks (future)
  - [ ] Link modules to Deacon Formation track
  - [ ] Link modules to Evangelist Training track
  - [ ] Link modules to Pastor Formation track
  - [ ] Link modules to Leadership Development track
  - [ ] Link modules to Lay Ministry track
- [ ] Create module detail page (future)
  - [ ] Build ModuleDetail.tsx component
  - [ ] Add content display with bilingual support
  - [ ] Create progress tracking UI
  - [ ] Add reflection question responses
- [ ] Test and deploy
  - [ ] Write integration tests for module queries
  - [ ] Test progress tracking functionality
  - [ ] Verify certificate issuance

## Completed - FMC Video Demonstrations with Swahili Subtitles
- [x] Plan and script video demonstrations (6 videos)
- [x] Generate video demonstrations (18.4 MB total, professional narration)
- [x] Create Swahili subtitles (SRT format for all 6 videos)
- [x] Upload videos to S3 CDN (all successful)
- [x] Create VideoPlayer component with subtitle toggle
- [x] Integrate videos into module detail pages
- [x] Test video playback and subtitle functionality


## In Progress - Post-Video Assessment Quizzes with Swahili
- [ ] Create quiz database schema
  - [ ] Quizzes table (title, description, videoId, passing_score)
  - [ ] Quiz questions table (question_text, question_text_sw, quiz_id, order)
  - [ ] Quiz answers table (answer_text, answer_text_sw, is_correct, question_id)
  - [ ] Student quiz results table (user_id, quiz_id, score, passed, completed_at)
- [ ] Add bilingual quiz questions
  - [ ] Quiz 1: FMC Origins (5 questions)
  - [ ] Quiz 2: Core Beliefs (5 questions)
  - [ ] Quiz 3: Holy Living (5 questions)
  - [ ] Quiz 4: Church Organization (5 questions)
  - [ ] Quiz 5: Leadership Roles (5 questions)
  - [ ] Quiz 6: Social Justice (5 questions)
- [ ] Build tRPC procedures
  - [ ] getQuizByVideo procedure
  - [ ] submitQuizAnswers mutation with scoring
  - [ ] getStudentQuizResults query
  - [ ] getQuizStats query for admin dashboard
- [ ] Create quiz UI component
  - [ ] Quiz question display with language toggle
  - [ ] Multiple choice answer selection
  - [ ] Progress indicator
  - [ ] Submit and results display
- [ ] Integrate quizzes into modules
  - [ ] Add quiz section to module detail pages
  - [ ] Link quizzes to videos
  - [ ] Display quiz results and scores
  - [ ] Track quiz completion for certificates
- [ ] Test and validate
  - [ ] Test quiz submission and scoring
  - [ ] Verify bilingual content display
  - [ ] Test passing/failing logic
  - [ ] Validate score calculations


## In Progress - Quiz Integration with Module Progress
- [ ] Insert quiz data into database
  - [ ] Create 6 quizzes linked to videos
  - [ ] Insert 30 quiz questions with bilingual content
  - [ ] Insert answer options with correct/incorrect flags
  - [ ] Set passing scores (70% for all quizzes)
- [ ] Create tRPC procedures for quizzes
  - [ ] getQuizByVideoId - Retrieve quiz for a video
  - [ ] submitQuizAnswers - Submit answers and calculate score
  - [ ] getQuizResults - Get student's quiz results
  - [ ] getModuleQuizStatus - Check if quiz is passed
- [ ] Update module progress tracking
  - [ ] Add quizPassed flag to module_progress table
  - [ ] Add quizScore field to track scores
  - [ ] Add quizCompletedAt timestamp
  - [ ] Modify certificate eligibility to require quiz pass
- [ ] Build quiz UI component
  - [ ] Create QuizComponent.tsx with question display
  - [ ] Add language toggle (English/Swahili)
  - [ ] Implement answer selection and submission
  - [ ] Show instant feedback on answers
  - [ ] Display final score and pass/fail status
- [ ] Integrate quizzes into module pages
  - [ ] Add quiz section to ModuleDetail.tsx
  - [ ] Show quiz only after module content viewed
  - [ ] Block certificate download until quiz passed
  - [ ] Display score on completion
- [ ] Test quiz-to-certificate flow
  - [ ] Verify quiz submission works
  - [ ] Test passing and failing scores
  - [ ] Verify certificate requires quiz pass
  - [ ] Test bilingual content display


## In Progress - Quiz UI Component and Integration (Current Session)
- [x] Fix TypeScript errors in routers.ts
  - [x] Fixed PDFKit import issues in certificate.ts
  - [x] Fixed category enum type in createModule procedure
  - [x] Fixed all PDFKit text() method calls
- [x] Create QuizComponent.tsx with bilingual support
  - [x] Built interactive quiz UI with language toggle
  - [x] Implemented question navigation and timer
  - [x] Added instant feedback and explanations
  - [x] Built results display with score calculation
- [x] Add missing tRPC procedures
  - [x] Added getVideosByModule procedure
  - [x] Added getQuizByModuleId procedure
  - [x] Added submitQuiz procedure
  - [x] Added downloadCertificate procedure (already existed)
- [ ] Fix tRPC type regeneration issue
  - [ ] Types not updating after adding new procedures
  - [ ] Need to investigate type caching or dev server state
- [ ] Complete quiz integration
  - [ ] Connect QuizComponent to ModuleDetail page
  - [ ] Implement quiz-to-certificate flow
  - [ ] Add quiz results to module progress
  - [ ] Test complete flow

## Remaining Features for Full Completion
- [ ] Admin Quiz Performance Dashboard
  - [ ] View quiz statistics by module
  - [ ] Track student quiz performance
  - [ ] Display pass/fail rates
  - [ ] Export quiz results
- [ ] Module Discussion Forums
  - [ ] Create forum database schema
  - [ ] Build forum UI component
  - [ ] Implement comment threading
  - [ ] Add moderation features
- [ ] Certificate Verification Portal
  - [ ] Create verification page
  - [ ] Implement certificate lookup by ID
  - [ ] Display certificate details
  - [ ] Add verification badge
- [ ] Stripe Payment Integration
  - [ ] Implement payment checkout flow
  - [ ] Set up webhook handlers
  - [ ] Test payment processing
  - [ ] Create payment confirmation emails


## In Progress - Admin Panel Development
- [ ] Create admin dashboard layout and navigation
- [ ] Build student progress tracking view with completion metrics
- [ ] Create quiz performance analytics with score distribution and pass rates
- [ ] Build module completion tracking with visualizations
- [ ] Add tRPC procedures for analytics data retrieval
- [ ] Integrate admin panel into application with role-based access
- [ ] Test admin functionality


## In Progress - Center of Studies Enrollment System
- [x] Update database schema for applications and enrollment
  - [x] Create applications table with status tracking (added email, phone fields)
  - [x] Create admin_approvers table for managing approvers
  - [x] Add admin approval workflow fields (approvedBy, approvedAt, rejectionReason)
- [x] Create application form component
  - [x] Build public application form (name, email, phone, address, church, pastor, essay)
  - [x] Add form validation and submission
  - [x] Create success confirmation message
- [ ] Build admin dashboard for approvals
  - [ ] Create admin applications review page
  - [ ] Add approve/reject functionality
  - [ ] Display application status and history
- [ ] Implement email notifications
  - [ ] Send confirmation email to applicants
  - [ ] Send approval email with login credentials to accepted students
  - [ ] Notify admins (Rev. Pastor Ileana Krum & Pastor Ilean Marie Krum) of new applications
- [ ] Update Center of Studies page
  - [ ] Make course access require authentication
  - [ ] Show "Apply to Center of Studies" button for non-authenticated users
  - [ ] Display enrolled courses for authenticated students
- [x] Add "Apply" button to homepage
  - [x] Add "Apply to Swahili Initiative Center of Studies" button with CTA section
  - [x] Link to application form on Center of Studies page
- [ ] Write and test enrollment system
  - [ ] Write vitest tests for application submission
  - [ ] Test admin approval workflow
  - [ ] Test email notifications
  - [ ] Verify authentication requirements

## Completed - Authentication Gate for Course Access (Current Session)
- [x] Add database functions for enrollment verification
  - [x] Create getUserApprovedApplication function
  - [x] Create getUserTrackAccess function
  - [x] Create getUserApplicationStatus function
  - [x] Create getUserApprovedApplications function
  - [x] Create getUserCourseEnrollment function
  - [x] Create createStudentEnrollment function
- [x] Create tRPC procedures for access control
  - [x] Add checkTrackAccess protected procedure
  - [x] Add getApplicationStatus protected procedure
  - [x] Return access status and application status to frontend
- [x] Update Center of Studies page with access control
  - [x] Add useAuth hook integration
  - [x] Query access status for each track when authenticated
  - [x] Display approval status badges (Approved/Pending/Rejected)
  - [x] Implement conditional button rendering based on access
  - [x] Show "Login to Apply" for non-authenticated users
  - [x] Show "View Courses" for approved students
  - [x] Show "Application Under Review" for pending applications
  - [x] Show "Reapply" for rejected applications
- [x] Write comprehensive vitest tests
  - [x] Create enrollment.test.ts with 12 enrollment tests
  - [x] Test getUserApprovedApplication function
  - [x] Test getUserTrackAccess function
  - [x] Test getUserApplicationStatus function
  - [x] Test getUserApprovedApplications function
  - [x] Test getUserCourseEnrollment function
  - [x] Test createStudentEnrollment function
  - [x] All 46 tests passing (including 12 new enrollment tests)
- [x] Verify authentication gate functionality
  - [x] Non-authenticated users see "Login to Apply" button
  - [x] Authenticated users see their application status
  - [x] Approved students can view courses
  - [x] Pending applications show "Under Review" message
  - [x] Rejected applications show "Reapply" option

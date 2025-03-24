import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SecondHomeComponent } from './second-home/second-home.component';
import { AboutUsInstructorComponent } from './about/about-us-instructor/about-us-instructor.component';
import { DevelopmetCourseComponent } from './second-home/courses/developmet-course/developmet-course.component';
import { FinanceCourseComponent } from './second-home/courses/finance-course/finance-course.component';
import { ItCourseComponent } from './second-home/courses/it-course/it-course.component';
import { DesignCourseComponent } from './second-home/courses/design-course/design-course.component';
import { BusinessCourseComponent } from './second-home/courses/business-course/business-course.component';
import { MarketingCourseComponent } from './second-home/courses/marketing-course/marketing-course.component';
import { HealthCourseComponent } from './second-home/courses/health-course/health-course.component';
import { OfferCourseComponent } from './second-home/courses/offer-course/offer-course.component';
import { ShippingCartComponent } from './shipping-cart/shipping-cart.component';
import { CartComponent } from './cart/cart.component';
import { WishlistStartComponent } from './wishlist-start/wishlist-start.component';
import { WishlistEndComponent } from './wishlist-end/wishlist-end.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { InstructorSignupComponent } from './instructor-signup/instructor-signup.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { TestComponent } from './test/test.component';
import { CourseHeaderComponent } from './course-header/course-header.component';
import { QaComponent } from './qa/qa.component';
import { MessagesComponent } from './messages/messages.component';
import { StudentSuggestionsComponent } from './student-suggestions/student-suggestions.component';
import { OverviewComponent } from './overview/overview.component';
import { StudentsComponent } from './students/students.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { CoursDetalisComponent } from './cours-detalis/cours-detalis.component';
import { ExploreCoursesHomeComponent } from './explore-courses-home/explore-courses-home.component';
import { DevelopmentCoursesComponent } from './explore-courses-home/courses-home/development-courses/development-courses.component';
import { FinanceCoursesComponent } from './explore-courses-home/courses-home/finance-courses/finance-courses.component';
import { ItCoursesComponent } from './explore-courses-home/courses-home/it-courses/it-courses.component';
import { DesignCoursesComponent } from './explore-courses-home/courses-home/design-courses/design-courses.component';
import { BusinessCoursesComponent } from './explore-courses-home/courses-home/business-courses/business-courses.component';
import { HealthCoursesComponent } from './explore-courses-home/courses-home/health-courses/health-courses.component';
import { OffergCoursesComponent } from './explore-courses-home/courses-home/offerg-courses/offerg-courses.component';
import { MarkitingCoursesComponent } from './explore-courses-home/courses-home/markiting-courses/markiting-courses.component';
import { CourseInformationComponent } from './course-information/course-information.component';
import { CourseInformationsComponent } from './course-informations/course-informations.component';
import { ViewOverviewComponent } from './view-overview/view-overview.component';

export const routes: Routes = [
  {path:"", redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"about",component:AboutComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"studentHome",component:SecondHomeComponent},
  {path:"explore",component:AboutUsInstructorComponent},
  {path:"shippingCart",component:ShippingCartComponent},
  {path:"cart",component:CartComponent},
  {path:"wishlist",component:WishlistStartComponent},
  {path:"wishedList",component:WishlistEndComponent},
  {path:"instructor-profile",component:InstructorProfileComponent},
  {path:"student-profile",component:StudentProfileComponent},
  {path:"createCoursesDetalis",component:CourseHeaderComponent},
  {path:"my-courses",component:MyCoursesComponent},
  {path:"courseDetails",component:CoursDetalisComponent},
  {path:"explore-courses",component:ExploreCoursesHomeComponent},
  {path:"course-Information",component:CourseInformationComponent},
  {path:"course-Informations",component:CourseInformationsComponent},
  {path:"course-content",component:ViewOverviewComponent},




// ----------------  courses  before login -------------------

{path:"development-courses",component:DevelopmentCoursesComponent},
{path:"finance-courses",component:FinanceCoursesComponent},
{path:"it-courses",component:ItCoursesComponent},
{path:"design-courses",component:DesignCoursesComponent},
{path:"business-courses",component:BusinessCoursesComponent},
{path:"health-courses",component:HealthCoursesComponent},
{path:"offer-courses",component:OffergCoursesComponent},
{path:"marketing-courses",component:MarkitingCoursesComponent},



// ----------------  courses  after login -------------------

{path:"development-course",component:DevelopmetCourseComponent},
{path:"finance-course",component:FinanceCourseComponent},
{path:"it-course",component:ItCourseComponent},
{path:"design-course",component:DesignCourseComponent},
{path:"business-course",component:BusinessCourseComponent},
{path:"marketing-course",component:MarketingCourseComponent},
{path:"health-course",component:HealthCourseComponent},
{path:"offer-course",component:OfferCourseComponent},



// ----------------  end courses -------------------



//  *********** HOME ***********
  {path:"home/about",redirectTo:"about",pathMatch:"full"},
  {path:"home/register",redirectTo:"register",pathMatch:"full"},
  {path:"home/login",redirectTo:"login",pathMatch:"full"},
  {path:"home/home",redirectTo:"home",pathMatch:"full"},
  {path:"home/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
  {path:"home/wishlist",redirectTo:"wishlist",pathMatch:"full"},
  {path:"home/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
  {path:"home/course-Informations",redirectTo:"explore-courses",pathMatch:"full"},






  {path:"home/development-courses",redirectTo:"development-courses",pathMatch:"full"},


//  *********** ABOUT ***********

  {path:"about/home",redirectTo:"home",pathMatch:"full"},
  {path:"about/register",redirectTo:"register",pathMatch:"full"},
  {path:"about/login",redirectTo:"login",pathMatch:"full"},
  {path:"about/about",redirectTo:"about",pathMatch:"full"},
  {path:"about/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
  {path:"about/wishlist",redirectTo:"wishlist",pathMatch:"full"},
  {path:"about/sign-up",component:InstructorSignupComponent},
  {path:"about/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},



//  *********** REGISTER ***********
  {path:"register/home",redirectTo:"home",pathMatch:"full"},
  {path:"register/about",redirectTo:"about",pathMatch:"full"},
  {path:"register/login",redirectTo:"login",pathMatch:"full"},
  {path:"register/register",redirectTo:"register",pathMatch:"full"},
  {path:"register/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
  {path:"register/wishlist",redirectTo:"wishlist",pathMatch:"full"},
  {path:"register/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},


//  *********** LOGIN ***********
  {path:"login/register",redirectTo:"register",pathMatch:"full"},
  {path:"login/home",redirectTo:"home",pathMatch:"full"},
  {path:"login/about",redirectTo:"about",pathMatch:"full"},
  {path:"login/login",redirectTo:"login",pathMatch:"full"},
  {path:"login/studentHome",redirectTo:"studentHome",pathMatch:"full"},
  {path:"login/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
  {path:"login/wishlist",redirectTo:"wishlist",pathMatch:"full"},
  {path:"login/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},


//  *********** CART ***********
{path:"shippingCart/register",redirectTo:"register",pathMatch:"full"},
{path:"shippingCart/home",redirectTo:"home",pathMatch:"full"},
{path:"shippingCart/about",redirectTo:"about",pathMatch:"full"},
{path:"shippingCart/login",redirectTo:"login",pathMatch:"full"},
{path:"shippingCart/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"shippingCart/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
{path:"shippingCart/wishlist",redirectTo:"wishlist",pathMatch:"full"},
{path:"shippingCart/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},


//  *********** wishlist ***********
{path:"wishlist/register",redirectTo:"register",pathMatch:"full"},
{path:"wishlist/home",redirectTo:"home",pathMatch:"full"},
{path:"wishlist/about",redirectTo:"about",pathMatch:"full"},
{path:"wishlist/login",redirectTo:"login",pathMatch:"full"},
{path:"wishlist/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"wishlist/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
{path:"wishlist/wishlist",redirectTo:"wishlist",pathMatch:"full"},
{path:"wishlist/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"wishlist/course-Information",redirectTo:"course-Information",pathMatch:"full"},

// ************* explore-courses ***************

{path:"explore-courses/register",redirectTo:"register",pathMatch:"full"},
{path:"explore-courses/home",redirectTo:"home",pathMatch:"full"},
{path:"explore-courses/about",redirectTo:"about",pathMatch:"full"},
{path:"explore-courses/login",redirectTo:"login",pathMatch:"full"},
{path:"explore-courses/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"explore-courses/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
{path:"explore-courses/wishlist",redirectTo:"wishlist",pathMatch:"full"},
{path:"explore-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},



// ************* course-Informations ***************

{path:"course-Informations/register",redirectTo:"register",pathMatch:"full"},
{path:"course-Informations/home",redirectTo:"home",pathMatch:"full"},
{path:"course-Informations/about",redirectTo:"about",pathMatch:"full"},
{path:"course-Informations/login",redirectTo:"login",pathMatch:"full"},
{path:"course-Informations/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"course-Informations/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
{path:"course-Informations/wishlist",redirectTo:"wishlist",pathMatch:"full"},
{path:"course-Informations/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},




// ********** courses at home ************


{path:"explore-courses/development-courses",redirectTo:"development-courses",pathMatch:"full"},
{path:"explore-courses/finance-courses",redirectTo:"finance-courses",pathMatch:"full"},
{path:"explore-courses/it-courses",redirectTo:"it-courses",pathMatch:"full"},
{path:"explore-courses/design-courses",redirectTo:"design-courses",pathMatch:"full"},
{path:"explore-courses/business-courses",redirectTo:"business-courses",pathMatch:"full"},
{path:"explore-courses/marketing-courses",redirectTo:"marketing-courses",pathMatch:"full"},
{path:"explore-courses/health-courses",redirectTo:"health-courses",pathMatch:"full"},
{path:"explore-courses/offer-courses",redirectTo:"offer-courses",pathMatch:"full"},





















//  *********** Student Home ***********
{path:"studentHome/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"studentHome/explore",redirectTo:"explore",pathMatch:"full"},
{path:"studentHome/cart",redirectTo:"cart",pathMatch:"full"},
{path:"studentHome/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"studentHome/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"studentHome/logOut",redirectTo:"home",pathMatch:"full"},
{path:"studentHome/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"studentHome/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"studentHome/course-Information",redirectTo:"course-Information",pathMatch:"full"},
{path:"studentHome/course-content",redirectTo:"course-content",pathMatch:"full"},



{path:"studentHome/development-course",redirectTo:"development-course",pathMatch:"full"},
{path:"studentHome/finance-course",redirectTo:"finance-course",pathMatch:"full"},
{path:"studentHome/it-course",redirectTo:"it-course",pathMatch:"full"},
{path:"studentHome/design-course",redirectTo:"design-course",pathMatch:"full"},
{path:"studentHome/business-course",redirectTo:"business-course",pathMatch:"full"},
{path:"studentHome/marketing-course",redirectTo:"marketing-course",pathMatch:"full"},
{path:"studentHome/health-course",redirectTo:"health-course",pathMatch:"full"},
{path:"studentHome/offer-course",redirectTo:"offer-course",pathMatch:"full"},



//  *********** instructor about ***********

{path:"explore/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"explore/explore",redirectTo:"explore",pathMatch:"full"},
{path:"explore/cart",redirectTo:"cart",pathMatch:"full"},
{path:"explore/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"explore/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"explore/logOut",redirectTo:"home",pathMatch:"full"},
{path:"explore/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"explore/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"explore/course-Information",redirectTo:"course-Information",pathMatch:"full"},



{path:"explore/development-course",redirectTo:"development-course",pathMatch:"full"},
{path:"explore/finance-course",redirectTo:"finance-course",pathMatch:"full"},
{path:"explore/it-course",redirectTo:"it-course",pathMatch:"full"},
{path:"explore/design-course",redirectTo:"design-course",pathMatch:"full"},
{path:"explore/business-course",redirectTo:"business-course",pathMatch:"full"},
{path:"explore/marketing-course",redirectTo:"marketing-course",pathMatch:"full"},
{path:"explore/health-course",redirectTo:"health-course",pathMatch:"full"},
{path:"explore/offer-course",redirectTo:"offer-course",pathMatch:"full"},




//  *********** Cart Signed ***********

{path:"cart/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"cart/explore",redirectTo:"explore",pathMatch:"full"},
{path:"cart/cart",redirectTo:"cart",pathMatch:"full"},
{path:"cart/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"cart/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"cart/logOut",redirectTo:"home",pathMatch:"full"},
{path:"cart/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"cart/my-courses",redirectTo:"my-courses",pathMatch:"full"},




//  *********** wished Signed ***********

{path:"wishedList/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"wishedList/explore",redirectTo:"explore",pathMatch:"full"},
{path:"wishedList/cart",redirectTo:"cart",pathMatch:"full"},
{path:"wishedList/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"wishedList/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"wishedList/logOut",redirectTo:"home",pathMatch:"full"},
{path:"wishedList/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"wishedList/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"wishedList/course-Information",redirectTo:"course-Information",pathMatch:"full"},

//  *********** my-courses ***********

{path:"my-courses/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"my-courses/explore",redirectTo:"explore",pathMatch:"full"},
{path:"my-courses/cart",redirectTo:"cart",pathMatch:"full"},
{path:"my-courses/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"my-courses/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"my-courses/logOut",redirectTo:"home",pathMatch:"full"},
{path:"my-courses/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"my-courses/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"my-courses/course-content",redirectTo:"course-content",pathMatch:"full"},




//  *********** course-Information ***********


{path:"course-Information/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"course-Information/explore",redirectTo:"explore",pathMatch:"full"},
{path:"course-Information/cart",redirectTo:"cart",pathMatch:"full"},
{path:"course-Information/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"course-Information/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"course-Information/logOut",redirectTo:"home",pathMatch:"full"},
{path:"course-Information/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"course-Information/my-courses",redirectTo:"my-courses",pathMatch:"full"},



//  *********** student profile ***********




{path:"student-profile/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"student-profile/explore",redirectTo:"explore",pathMatch:"full"},
{path:"student-profile/cart",redirectTo:"cart",pathMatch:"full"},
{path:"student-profile/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"student-profile/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"student-profile/logOut",redirectTo:"home",pathMatch:"full"},
{path:"student-profile/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"student-profile/my-courses",redirectTo:"my-courses",pathMatch:"full"},










//  *********** instructor profile ***********

{path:"instructor-profile/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"instructor-profile/explore",redirectTo:"explore",pathMatch:"full"},
{path:"instructor-profile/cart",redirectTo:"cart",pathMatch:"full"},
{path:"instructor-profile/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"instructor-profile/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"instructor-profile/logOut",redirectTo:"home",pathMatch:"full"},
{path:"instructor-profile/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"instructor-profile/create-course",component:CreateCourseComponent},
{path:"instructor-profile/create-course/course/exit",redirectTo:"instructor-profile/create-course",pathMatch:"full"},
{path:"instructor-profile/create-course/course",component:TestComponent},
{path:"instructor-profile/create-course/course/createCoursesDetalis",redirectTo:"createCoursesDetalis",pathMatch:"full"},

{path:"createCoursesDetalis/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"createCoursesDetalis/courseDetails",redirectTo:"courseDetails",pathMatch:"full"},
{path:"instructor-profile/my-courses",redirectTo:"my-courses",pathMatch:"full"},





{path:"courseDetails/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"courseDetails/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"courseDetails/explore",redirectTo:"explore",pathMatch:"full"},
{path:"courseDetails/cart",redirectTo:"cart",pathMatch:"full"},
{path:"courseDetails/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"courseDetails/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"courseDetails/logOut",redirectTo:"logOut",pathMatch:"full"},
{path:"courseDetails/student-profile",redirectTo:"student-profile",pathMatch:"full"},






//  *********** course-content ***********




{path:"course-content/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"course-content/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"course-content/explore",redirectTo:"explore",pathMatch:"full"},
{path:"course-content/cart",redirectTo:"cart",pathMatch:"full"},
{path:"course-content/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"course-content/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"course-content/logOut",redirectTo:"logOut",pathMatch:"full"},
{path:"course-content/student-profile",redirectTo:"student-profile",pathMatch:"full"},







{path:"instructor-profile/qa",redirectTo:"qa",pathMatch:"full"},
{path:"instructor-profile/messages",redirectTo:"messages",pathMatch:"full"},
{path:"instructor-profile/student-suggestions",redirectTo:"student-suggestions",pathMatch:"full"},

{path:"instructor-profile/overview",redirectTo:"overview",pathMatch:"full"},
{path:"instructor-profile/students",redirectTo:"students",pathMatch:"full"},
{path:"instructor-profile/reviews",redirectTo:"reviews",pathMatch:"full"},


{path:"qa",component:QaComponent},
{path:"messages",component:MessagesComponent},
{path:"student-suggestions",component:StudentSuggestionsComponent},

{path:"overview",component:OverviewComponent},
{path:"students",component:StudentsComponent},
{path:"reviews",component:ReviewsComponent},






//  *********** create-course***********



{path:"instructor-profile/create-course/create-course",redirectTo:"instructor-profile/create-course",pathMatch:"full"},
{path:"instructor-profile/create-course/qa",redirectTo:"qa",pathMatch:"full"},
{path:"instructor-profile/create-course/messages",redirectTo:"messages",pathMatch:"full"},
{path:"instructor-profile/create-course/student-suggestions",redirectTo:"student-suggestions",pathMatch:"full"},
{path:"instructor-profile/create-course/overview",redirectTo:"overview",pathMatch:"full"},
{path:"instructor-profile/create-course/students",redirectTo:"students",pathMatch:"full"},
{path:"instructor-profile/create-course/reviews",redirectTo:"reviews",pathMatch:"full"},
{path:"instructor-profile/create-course/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"instructor-profile/create-course/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"instructor-profile/create-course/studentHome",redirectTo:"studentHome",pathMatch:"full"},








//  *********** QA ***********


{path:"qa/qa",redirectTo:"qa",pathMatch:"full"},
{path:"qa/messages",redirectTo:"messages",pathMatch:"full"},
{path:"qa/student-suggestions",redirectTo:"student-suggestions",pathMatch:"full"},
{path:"qa/overview",redirectTo:"overview",pathMatch:"full"},
{path:"qa/students",redirectTo:"students",pathMatch:"full"},
{path:"qa/reviews",redirectTo:"reviews",pathMatch:"full"},
{path:"qa/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"qa/create-course",redirectTo:"instructor-profile/create-course",pathMatch:"full"},
{path:"qa/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"qa/studentHome",redirectTo:"studentHome",pathMatch:"full"},


//  *********** messages ***********


{path:"messages/messages",redirectTo:"messages",pathMatch:"full"},
{path:"messages/qa",redirectTo:"qa",pathMatch:"full"},
{path:"messages/student-suggestions",redirectTo:"student-suggestions",pathMatch:"full"},
{path:"messages/overview",redirectTo:"overview",pathMatch:"full"},
{path:"messages/students",redirectTo:"students",pathMatch:"full"},
{path:"messages/reviews",redirectTo:"reviews",pathMatch:"full"},
{path:"messages/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"messages/create-course",redirectTo:"instructor-profile/create-course",pathMatch:"full"},
{path:"messages/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"messages/studentHome",redirectTo:"studentHome",pathMatch:"full"},


//  *********** student-suggestions ***********



{path:"student-suggestions/student-suggestions",redirectTo:"student-suggestions",pathMatch:"full"},
{path:"student-suggestions/messages",redirectTo:"messages",pathMatch:"full"},
{path:"student-suggestions/qa",redirectTo:"qa",pathMatch:"full"},
{path:"student-suggestions/overview",redirectTo:"overview",pathMatch:"full"},
{path:"student-suggestions/students",redirectTo:"students",pathMatch:"full"},
{path:"student-suggestions/reviews",redirectTo:"reviews",pathMatch:"full"},
{path:"student-suggestions/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"student-suggestions/create-course",redirectTo:"instructor-profile/create-course",pathMatch:"full"},
{path:"student-suggestions/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"student-suggestions/studentHome",redirectTo:"studentHome",pathMatch:"full"},



//  *********** overview ***********




{path:"overview/student-suggestions",redirectTo:"student-suggestions",pathMatch:"full"},
{path:"overview/messages",redirectTo:"messages",pathMatch:"full"},
{path:"overview/qa",redirectTo:"qa",pathMatch:"full"},
{path:"overview/overview",redirectTo:"overview",pathMatch:"full"},
{path:"overview/students",redirectTo:"students",pathMatch:"full"},
{path:"overview/reviews",redirectTo:"reviews",pathMatch:"full"},
{path:"overview/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"overview/create-course",redirectTo:"instructor-profile/create-course",pathMatch:"full"},
{path:"overview/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"overview/studentHome",redirectTo:"studentHome",pathMatch:"full"},



//  *********** students ***********




{path:"students/student-suggestions",redirectTo:"student-suggestions",pathMatch:"full"},
{path:"students/messages",redirectTo:"messages",pathMatch:"full"},
{path:"students/qa",redirectTo:"qa",pathMatch:"full"},
{path:"students/overview",redirectTo:"overview",pathMatch:"full"},
{path:"students/students",redirectTo:"students",pathMatch:"full"},
{path:"students/reviews",redirectTo:"reviews",pathMatch:"full"},
{path:"students/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"students/create-course",redirectTo:"instructor-profile/create-course",pathMatch:"full"},
{path:"students/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"students/studentHome",redirectTo:"studentHome",pathMatch:"full"},




//  *********** reviews ***********


{path:"reviews/student-suggestions",redirectTo:"student-suggestions",pathMatch:"full"},
{path:"reviews/messages",redirectTo:"messages",pathMatch:"full"},
{path:"reviews/qa",redirectTo:"qa",pathMatch:"full"},
{path:"reviews/overview",redirectTo:"overview",pathMatch:"full"},
{path:"reviews/students",redirectTo:"students",pathMatch:"full"},
{path:"reviews/reviews",redirectTo:"reviews",pathMatch:"full"},
{path:"reviews/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"reviews/create-course",redirectTo:"instructor-profile/create-course",pathMatch:"full"},
{path:"reviews/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"reviews/studentHome",redirectTo:"studentHome",pathMatch:"full"},













// ------------ courses routes --------------
//  development-courses

{path:"development-courses/home",redirectTo:"home",pathMatch:"full"},
{path:"development-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"development-courses/about",redirectTo:"about",pathMatch:"full"},
{path:"development-courses/register",redirectTo:"register",pathMatch:"full"},
{path:"development-courses/login",redirectTo:"login",pathMatch:"full"},
{path:"development-courses/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
{path:"development-courses/wishlist",redirectTo:"wishlist",pathMatch:"full"},
{path:"development-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"development-courses/course-Informations",redirectTo:"course-Informations",pathMatch:"full"},




{path:"development-courses/development-courses",redirectTo:"development-courses",pathMatch:"full"},
{path:"development-courses/finance-courses",redirectTo:"finance-courses",pathMatch:"full"},
{path:"development-courses/it-courses",redirectTo:"it-courses",pathMatch:"full"},
{path:"development-courses/design-courses",redirectTo:"design-courses",pathMatch:"full"},
{path:"development-courses/business-courses",redirectTo:"business-courses",pathMatch:"full"},
{path:"development-courses/marketing-courses",redirectTo:"marketing-courses",pathMatch:"full"},
{path:"development-courses/health-courses",redirectTo:"health-courses",pathMatch:"full"},
{path:"development-courses/offer-courses",redirectTo:"offer-courses",pathMatch:"full"},

//  finance-courses

{path:"finance-courses/home",redirectTo:"home",pathMatch:"full"},
{path:"finance-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"finance-courses/about",redirectTo:"about",pathMatch:"full"},
{path:"finance-courses/register",redirectTo:"register",pathMatch:"full"},
{path:"finance-courses/login",redirectTo:"login",pathMatch:"full"},
{path:"finance-courses/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
{path:"finance-courses/wishlist",redirectTo:"wishlist",pathMatch:"full"},
{path:"finance-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"finance-courses/course-Informations",redirectTo:"course-Informations",pathMatch:"full"},




{path:"finance-courses/development-courses",redirectTo:"development-courses",pathMatch:"full"},
{path:"finance-courses/finance-courses",redirectTo:"finance-courses",pathMatch:"full"},
{path:"finance-courses/it-courses",redirectTo:"it-courses",pathMatch:"full"},
{path:"finance-courses/design-courses",redirectTo:"design-courses",pathMatch:"full"},
{path:"finance-courses/business-courses",redirectTo:"business-courses",pathMatch:"full"},
{path:"finance-courses/marketing-courses",redirectTo:"marketing-courses",pathMatch:"full"},
{path:"finance-courses/health-courses",redirectTo:"health-courses",pathMatch:"full"},
{path:"finance-courses/offer-courses",redirectTo:"offer-courses",pathMatch:"full"},


//  it-courses

{path:"it-courses/home",redirectTo:"home",pathMatch:"full"},
{path:"it-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"it-courses/about",redirectTo:"about",pathMatch:"full"},
{path:"it-courses/register",redirectTo:"register",pathMatch:"full"},
{path:"it-courses/login",redirectTo:"login",pathMatch:"full"},
{path:"it-courses/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
{path:"it-courses/wishlist",redirectTo:"wishlist",pathMatch:"full"},
{path:"it-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"it-courses/course-Informations",redirectTo:"course-Informations",pathMatch:"full"},




{path:"it-courses/development-courses",redirectTo:"development-courses",pathMatch:"full"},
{path:"it-courses/finance-courses",redirectTo:"finance-courses",pathMatch:"full"},
{path:"it-courses/it-courses",redirectTo:"it-courses",pathMatch:"full"},
{path:"it-courses/design-courses",redirectTo:"design-courses",pathMatch:"full"},
{path:"it-courses/business-courses",redirectTo:"business-courses",pathMatch:"full"},
{path:"it-courses/marketing-courses",redirectTo:"marketing-courses",pathMatch:"full"},
{path:"it-courses/health-courses",redirectTo:"health-courses",pathMatch:"full"},
{path:"it-courses/offer-courses",redirectTo:"offer-courses",pathMatch:"full"},


//  design-courses

{path:"design-courses/home",redirectTo:"home",pathMatch:"full"},
{path:"design-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"design-courses/about",redirectTo:"about",pathMatch:"full"},
{path:"design-courses/register",redirectTo:"register",pathMatch:"full"},
{path:"design-courses/login",redirectTo:"login",pathMatch:"full"},
{path:"design-courses/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
{path:"design-courses/wishlist",redirectTo:"wishlist",pathMatch:"full"},
{path:"design-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"design-courses/course-Informations",redirectTo:"course-Informations",pathMatch:"full"},




{path:"design-courses/development-courses",redirectTo:"development-courses",pathMatch:"full"},
{path:"design-courses/finance-courses",redirectTo:"finance-courses",pathMatch:"full"},
{path:"design-courses/it-courses",redirectTo:"it-courses",pathMatch:"full"},
{path:"design-courses/design-courses",redirectTo:"design-courses",pathMatch:"full"},
{path:"design-courses/business-courses",redirectTo:"business-courses",pathMatch:"full"},
{path:"design-courses/marketing-courses",redirectTo:"marketing-courses",pathMatch:"full"},
{path:"design-courses/health-courses",redirectTo:"health-courses",pathMatch:"full"},
{path:"design-courses/offer-courses",redirectTo:"offer-courses",pathMatch:"full"},

//  business-courses

{path:"business-courses/home",redirectTo:"home",pathMatch:"full"},
{path:"business-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"business-courses/about",redirectTo:"about",pathMatch:"full"},
{path:"business-courses/register",redirectTo:"register",pathMatch:"full"},
{path:"business-courses/login",redirectTo:"login",pathMatch:"full"},
{path:"business-courses/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
{path:"business-courses/wishlist",redirectTo:"wishlist",pathMatch:"full"},
{path:"business-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"business-courses/course-Informations",redirectTo:"course-Informations",pathMatch:"full"},




{path:"business-courses/development-courses",redirectTo:"development-courses",pathMatch:"full"},
{path:"business-courses/finance-courses",redirectTo:"finance-courses",pathMatch:"full"},
{path:"business-courses/it-courses",redirectTo:"it-courses",pathMatch:"full"},
{path:"business-courses/design-courses",redirectTo:"design-courses",pathMatch:"full"},
{path:"business-courses/business-courses",redirectTo:"business-courses",pathMatch:"full"},
{path:"business-courses/marketing-courses",redirectTo:"marketing-courses",pathMatch:"full"},
{path:"business-courses/health-courses",redirectTo:"health-courses",pathMatch:"full"},
{path:"business-courses/offer-courses",redirectTo:"offer-courses",pathMatch:"full"},

//  marketing-courses

{path:"marketing-courses/home",redirectTo:"home",pathMatch:"full"},
{path:"marketing-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"marketing-courses/about",redirectTo:"about",pathMatch:"full"},
{path:"marketing-courses/register",redirectTo:"register",pathMatch:"full"},
{path:"marketing-courses/login",redirectTo:"login",pathMatch:"full"},
{path:"marketing-courses/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
{path:"marketing-courses/wishlist",redirectTo:"wishlist",pathMatch:"full"},
{path:"marketing-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"marketing-courses/course-Informations",redirectTo:"course-Informations",pathMatch:"full"},





{path:"marketing-courses/development-courses",redirectTo:"development-courses",pathMatch:"full"},
{path:"marketing-courses/finance-courses",redirectTo:"finance-courses",pathMatch:"full"},
{path:"marketing-courses/it-courses",redirectTo:"it-courses",pathMatch:"full"},
{path:"marketing-courses/design-courses",redirectTo:"design-courses",pathMatch:"full"},
{path:"marketing-courses/business-courses",redirectTo:"business-courses",pathMatch:"full"},
{path:"marketing-courses/marketing-courses",redirectTo:"marketing-courses",pathMatch:"full"},
{path:"marketing-courses/health-courses",redirectTo:"health-courses",pathMatch:"full"},
{path:"marketing-courses/offer-courses",redirectTo:"offer-courses",pathMatch:"full"},

//  health-courses

{path:"health-courses/home",redirectTo:"home",pathMatch:"full"},
{path:"health-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"health-courses/about",redirectTo:"about",pathMatch:"full"},
{path:"health-courses/register",redirectTo:"register",pathMatch:"full"},
{path:"health-courses/login",redirectTo:"login",pathMatch:"full"},
{path:"health-courses/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
{path:"health-courses/wishlist",redirectTo:"wishlist",pathMatch:"full"},
{path:"health-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"health-courses/course-Informations",redirectTo:"course-Informations",pathMatch:"full"},




{path:"health-courses/development-courses",redirectTo:"development-courses",pathMatch:"full"},
{path:"health-courses/finance-courses",redirectTo:"finance-courses",pathMatch:"full"},
{path:"health-courses/it-courses",redirectTo:"it-courses",pathMatch:"full"},
{path:"health-courses/design-courses",redirectTo:"design-courses",pathMatch:"full"},
{path:"health-courses/business-courses",redirectTo:"business-courses",pathMatch:"full"},
{path:"health-courses/marketing-courses",redirectTo:"marketing-courses",pathMatch:"full"},
{path:"health-courses/health-courses",redirectTo:"health-courses",pathMatch:"full"},
{path:"health-courses/offer-courses",redirectTo:"offer-courses",pathMatch:"full"},


//  offer-course

{path:"offer-courses/home",redirectTo:"home",pathMatch:"full"},
{path:"offer-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"offer-courses/about",redirectTo:"about",pathMatch:"full"},
{path:"offer-courses/register",redirectTo:"register",pathMatch:"full"},
{path:"offer-courses/login",redirectTo:"login",pathMatch:"full"},
{path:"offer-courses/shippingCart",redirectTo:"shippingCart",pathMatch:"full"},
{path:"offer-courses/wishlist",redirectTo:"wishlist",pathMatch:"full"},
{path:"offer-courses/explore-courses",redirectTo:"explore-courses",pathMatch:"full"},
{path:"offer-courses/course-Informations",redirectTo:"course-Informations",pathMatch:"full"},




{path:"offer-courses/development-courses",redirectTo:"development-courses",pathMatch:"full"},
{path:"offer-courses/finance-courses",redirectTo:"finance-courses",pathMatch:"full"},
{path:"offer-courses/it-courses",redirectTo:"it-courses",pathMatch:"full"},
{path:"offer-courses/design-courses",redirectTo:"design-courses",pathMatch:"full"},
{path:"offer-courses/business-courses",redirectTo:"business-courses",pathMatch:"full"},
{path:"offer-courses/marketing-courses",redirectTo:"marketing-courses",pathMatch:"full"},
{path:"offer-courses/health-courses",redirectTo:"health-courses",pathMatch:"full"},
{path:"offer-courses/offer-courses",redirectTo:"offer-courses",pathMatch:"full"},





// ---------------- course routes ------------
//  development-course

{path:"development-course/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"development-course/explore",redirectTo:"explore",pathMatch:"full"},
{path:"development-course/cart",redirectTo:"cart",pathMatch:"full"},
{path:"development-course/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"development-course/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"development-course/logOut",redirectTo:"home",pathMatch:"full"},
{path:"development-course/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"development-course/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"development-course/course-Information",redirectTo:"course-Information",pathMatch:"full"},







{path:"development-course/development-course",redirectTo:"development-course",pathMatch:"full"},
{path:"development-course/finance-course",redirectTo:"finance-course",pathMatch:"full"},
{path:"development-course/it-course",redirectTo:"it-course",pathMatch:"full"},
{path:"development-course/design-course",redirectTo:"design-course",pathMatch:"full"},
{path:"development-course/business-course",redirectTo:"business-course",pathMatch:"full"},
{path:"development-course/marketing-course",redirectTo:"marketing-course",pathMatch:"full"},
{path:"development-course/health-course",redirectTo:"health-course",pathMatch:"full"},
{path:"development-course/offer-course",redirectTo:"offer-course",pathMatch:"full"},

//  finance-course

{path:"finance-course/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"finance-course/explore",redirectTo:"explore",pathMatch:"full"},
{path:"finance-course/cart",redirectTo:"cart",pathMatch:"full"},
{path:"finance-course/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"finance-course/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"finance-course/logOut",redirectTo:"home",pathMatch:"full"},
{path:"finance-course/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"finance-course/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"finance-course/course-Information",redirectTo:"course-Information",pathMatch:"full"},



{path:"finance-course/development-course",redirectTo:"development-course",pathMatch:"full"},
{path:"finance-course/finance-course",redirectTo:"finance-course",pathMatch:"full"},
{path:"finance-course/it-course",redirectTo:"it-course",pathMatch:"full"},
{path:"finance-course/design-course",redirectTo:"design-course",pathMatch:"full"},
{path:"finance-course/business-course",redirectTo:"business-course",pathMatch:"full"},
{path:"finance-course/marketing-course",redirectTo:"marketing-course",pathMatch:"full"},
{path:"finance-course/health-course",redirectTo:"health-course",pathMatch:"full"},
{path:"finance-course/offer-course",redirectTo:"offer-course",pathMatch:"full"},


//  it-course

{path:"it-course/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"it-course/explore",redirectTo:"explore",pathMatch:"full"},
{path:"it-course/cart",redirectTo:"cart",pathMatch:"full"},
{path:"it-course/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"it-course/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"it-course/logOut",redirectTo:"home",pathMatch:"full"},
{path:"it-course/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"it-course/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"it-course/course-Information",redirectTo:"course-Information",pathMatch:"full"},



{path:"it-course/development-course",redirectTo:"development-course",pathMatch:"full"},
{path:"it-course/finance-course",redirectTo:"finance-course",pathMatch:"full"},
{path:"it-course/it-course",redirectTo:"it-course",pathMatch:"full"},
{path:"it-course/design-course",redirectTo:"design-course",pathMatch:"full"},
{path:"it-course/business-course",redirectTo:"business-course",pathMatch:"full"},
{path:"it-course/marketing-course",redirectTo:"marketing-course",pathMatch:"full"},
{path:"it-course/health-course",redirectTo:"health-course",pathMatch:"full"},
{path:"it-course/offer-course",redirectTo:"offer-course",pathMatch:"full"},


//  design-course

{path:"design-course/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"design-course/explore",redirectTo:"explore",pathMatch:"full"},
{path:"design-course/cart",redirectTo:"cart",pathMatch:"full"},
{path:"design-course/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"design-course/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"design-course/logOut",redirectTo:"home",pathMatch:"full"},
{path:"design-course/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"design-course/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"design-course/course-Information",redirectTo:"course-Information",pathMatch:"full"},



{path:"design-course/development-course",redirectTo:"development-course",pathMatch:"full"},
{path:"design-course/finance-course",redirectTo:"finance-course",pathMatch:"full"},
{path:"design-course/it-course",redirectTo:"it-course",pathMatch:"full"},
{path:"design-course/design-course",redirectTo:"design-course",pathMatch:"full"},
{path:"design-course/business-course",redirectTo:"business-course",pathMatch:"full"},
{path:"design-course/marketing-course",redirectTo:"marketing-course",pathMatch:"full"},
{path:"design-course/health-course",redirectTo:"health-course",pathMatch:"full"},
{path:"design-course/offer-course",redirectTo:"offer-course",pathMatch:"full"},

//  business-course

{path:"business-course/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"business-course/explore",redirectTo:"explore",pathMatch:"full"},
{path:"business-course/cart",redirectTo:"cart",pathMatch:"full"},
{path:"business-course/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"business-course/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"business-course/logOut",redirectTo:"home",pathMatch:"full"},
{path:"business-course/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"business-course/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"business-course/course-Information",redirectTo:"course-Information",pathMatch:"full"},



{path:"business-course/development-course",redirectTo:"development-course",pathMatch:"full"},
{path:"business-course/finance-course",redirectTo:"finance-course",pathMatch:"full"},
{path:"business-course/it-course",redirectTo:"it-course",pathMatch:"full"},
{path:"business-course/design-course",redirectTo:"design-course",pathMatch:"full"},
{path:"business-course/business-course",redirectTo:"business-course",pathMatch:"full"},
{path:"business-course/marketing-course",redirectTo:"marketing-course",pathMatch:"full"},
{path:"business-course/health-course",redirectTo:"health-course",pathMatch:"full"},
{path:"business-course/offer-course",redirectTo:"offer-course",pathMatch:"full"},

//  marketing-course

{path:"marketing-course/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"marketing-course/explore",redirectTo:"explore",pathMatch:"full"},
{path:"marketing-course/cart",redirectTo:"cart",pathMatch:"full"},
{path:"marketing-course/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"marketing-course/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"marketing-course/logOut",redirectTo:"home",pathMatch:"full"},
{path:"marketing-course/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"marketing-course/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"marketing-course/course-Information",redirectTo:"course-Information",pathMatch:"full"},




{path:"marketing-course/development-course",redirectTo:"development-course",pathMatch:"full"},
{path:"marketing-course/finance-course",redirectTo:"finance-course",pathMatch:"full"},
{path:"marketing-course/it-course",redirectTo:"it-course",pathMatch:"full"},
{path:"marketing-course/design-course",redirectTo:"design-course",pathMatch:"full"},
{path:"marketing-course/business-course",redirectTo:"business-course",pathMatch:"full"},
{path:"marketing-course/marketing-course",redirectTo:"marketing-course",pathMatch:"full"},
{path:"marketing-course/health-course",redirectTo:"health-course",pathMatch:"full"},
{path:"marketing-course/offer-course",redirectTo:"offer-course",pathMatch:"full"},

//  health-course

{path:"health-course/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"health-course/explore",redirectTo:"explore",pathMatch:"full"},
{path:"health-course/cart",redirectTo:"cart",pathMatch:"full"},
{path:"health-course/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"health-course/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"health-course/logOut",redirectTo:"home",pathMatch:"full"},
{path:"health-course/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"health-course/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"health-course/course-Information",redirectTo:"course-Information",pathMatch:"full"},


{path:"health-course/development-course",redirectTo:"development-course",pathMatch:"full"},
{path:"health-course/finance-course",redirectTo:"finance-course",pathMatch:"full"},
{path:"health-course/it-course",redirectTo:"it-course",pathMatch:"full"},
{path:"health-course/design-course",redirectTo:"design-course",pathMatch:"full"},
{path:"health-course/business-course",redirectTo:"business-course",pathMatch:"full"},
{path:"health-course/marketing-course",redirectTo:"marketing-course",pathMatch:"full"},
{path:"health-course/health-course",redirectTo:"health-course",pathMatch:"full"},
{path:"health-course/offer-course",redirectTo:"offer-course",pathMatch:"full"},


//  offer-course

{path:"offer-course/studentHome",redirectTo:"studentHome",pathMatch:"full"},
{path:"offer-course/explore",redirectTo:"explore",pathMatch:"full"},
{path:"offer-course/cart",redirectTo:"cart",pathMatch:"full"},
{path:"offer-course/wishedList",redirectTo:"wishedList",pathMatch:"full"},
{path:"offer-course/instructor-profile",redirectTo:"instructor-profile",pathMatch:"full"},
{path:"offer-course/logOut",redirectTo:"home",pathMatch:"full"},
{path:"offer-course/student-profile",redirectTo:"student-profile",pathMatch:"full"},
{path:"offer-course/my-courses",redirectTo:"my-courses",pathMatch:"full"},
{path:"offer-course/course-Information",redirectTo:"course-Information",pathMatch:"full"},



{path:"offer-course/development-course",redirectTo:"development-course",pathMatch:"full"},
{path:"offer-course/finance-course",redirectTo:"finance-course",pathMatch:"full"},
{path:"offer-course/it-course",redirectTo:"it-course",pathMatch:"full"},
{path:"offer-course/design-course",redirectTo:"design-course",pathMatch:"full"},
{path:"offer-course/business-course",redirectTo:"business-course",pathMatch:"full"},
{path:"offer-course/marketing-course",redirectTo:"marketing-course",pathMatch:"full"},
{path:"offer-course/health-course",redirectTo:"health-course",pathMatch:"full"},
{path:"offer-course/offer-course",redirectTo:"offer-course",pathMatch:"full"},













  {path:"**",component:NotFoundComponent},

];

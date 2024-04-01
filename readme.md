Live link : https://level-2-assgn3.vercel.app



<h1> This SQL task </h1>

<h3>If you run this code localy,you should be init this code : npm init </h3>

* build command is { npm run build }
* run command is { npm run dev }

* this project host in vercel . when you update project you need to code : { vercel --prod}

<h3>1. User Registration</h3> <b>Route: /api/auth/register  , hit this route and request body is</b>
 {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "123456",
    "role": "user"
}
<h3>2. User Login</h3> <b>Route: /api/auth/login  , hit this route and request body is</b>
 {
    "username": "john_doe",
    "password": "123456"
}
<h3>3.Change Password</h3> <b>Route: /api/auth/change-password  , hit this route and request body is</b>
{
    "currentPassword": "123456",
    "newPassword": "new123456"
}
<h3>4**. Create a Course (Only Admin can do this)**</h3> <b>Route: /api/courses  , hit this route and request body is</b>
{
    "title": "Introduction to Web Development",
    "instructor": "John Smith",
    "categoryId": "12345abcde67890fghij",
    "price": 49.99,
    "tags": [
        {"name": "Programming", "isDeleted": false},
        {"name": "Web Development", "isDeleted": false}
    ],
    "startDate": "2023-02-01",
    "endDate": "2023-04-01",
    "language": "English",
    "provider": "Tech Academy",
    "durationInWeeks": 8,
    "details": {
        "level": "Beginner",
        "description": "A comprehensive introduction to web development."
    }
}

<h3>5. Get Paginated and Filtered Courses.</h3> <b>Route:/api/courses  .</b>

<h3>6. Create a Category (Only Admin can do this).</h3> <b>Route:/api/categories  .</b>
Request Headers:Authorization: <ADMIN_JWT_TOKEN>
Request Body:{
    "name": "Web Development"
}
<h3>7. Get All Categories</h3> <b>Route:/api/categories  .</b>
<h3>8.  Create a Review (Only the user can do this)</h3> <b>Route:/api/categories  .</b>
Request Headers:Authorization: <USER_JWT_TOKEN>
Request Body:{
    "courseId": "67890fghij54321abcde",
    "rating": 4,
    "review": "Great course, very informative and well-structured."
}
<h3>9.Update a Course (Only Admin can do this)</h3> <b>Route:/api/courses/:courseId  .</b>
Request Headers:Authorization: <ADMIN_JWT_TOKEN>
Request Body:{
    "price": 59.99,
    "tags": [
        {"name": "Programming", "isDeleted": false},
        {"name": "Web Development", "isDeleted": false},
        {"name": "JavaScript", "isDeleted": false}
    ],
    "details": {
        "level": "Intermediate",
        "description": "A comprehensive course on web development with a focus on JavaScript."
    }
}
<h3>10.Get Course by ID with Reviews</h3> <b>Route: /api/courses/:courseId/reviews</b>

<h3>11.Get the Best Course Based on Average Review (Rating)</h3> <b>Route: /api/course/best</b>

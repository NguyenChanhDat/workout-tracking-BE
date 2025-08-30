import { LoginDto } from '@application/dto/user/loginDto';
import { SignupDto } from '@application/dto/user/signupDto';
import { RoleEnum } from '@shared/enums/RoleEnum';
import supertest from 'supertest';
const request = supertest('http://localhost:8080');

// describe('GET REQUESTS', () =>{
//     it('should GET /posts', async () => {
//         const response = await request.get('/posts')
//         // 200 OK
//         expect(response.status).toBe(200)
//         // 100 posts
//         expect(response.body.length).toBe(100)
//         // First post has userId = 1
//         expect(response.body[0].userId).toBe(1)
//     })
//     it('should GET /comments with query params', async () => {
//         //const response = await request.get('/comments?postId=1')
//         const response = await request.get('/comments').query({postId: 1})
//         // 200 OK
//         expect(response.status).toBe(200)
//         // 5 comments
//         expect(response.body.length).toBe(5)
//         // First comment has postId = 1
//         expect(response.body[0].postId).toBe(1)
//     })
// })

// describe('DELETE REQUESTS', () => {
//     it('should DELETE /posts', async () => {
//         const response = await request.delete('/posts/1')
//         // 200 OK
//         expect(response.status).toBe(200)
//     })
// })

describe('ADMIN REQUESTS', () => {
  it('should signup then login admin successfully', async () => {
    const signupData: SignupDto = {
      username: 'admin1',
      password: 'veryStrongPassword',
      role: RoleEnum.ADMIN,
    };
    const signupRes = await request.post('/admin/signup').send(signupData);
    console.log('signupRes.body ', signupRes.body);
    expect(signupRes.status).toBe(200);
    const loginData: LoginDto = {
      username: 'admin1',
      password: 'veryStrongPassword',
    };
    const loginRes = await request.post('/admin/login').send(loginData);
    console.log('loginRes.body ', loginRes.body);
    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toHaveProperty('token');
  });
});

// describe('PUT REQUESTS', () => {
//   it('should PUT /posts', async () => {
//     const data = {
//       id: 1,
//       title: 'updated post title',
//       body: 'bar',
//       userId: 1,
//       randomdata: 'randomvalue',
//     };
//     // Before updating the post, we need to get the post
//     const getResponse = await request.get('/posts/1');
//     const beforeTitle = getResponse.body.title;
//     // we used await to wait for the response
//     const response = await request.put('/posts/1').send(data);
//     expect(response.status).toBe(200);
//     // New post dont have the same title as before
//     expect(response.body.title).not.toBe(beforeTitle);
//     // New post has title the same as the one we sent
//     expect(response.body.title).toBe(data.title);
//   });
// });

// //The diffrence between PUT and PATCH is that PUT updates the whole object and PATCH updates only the fields that are sent
// describe('PATCH REQUESTS', () => {
//   it('should PATCH /posts', async () => {
//     const data = {
//       title: 'updated post title',
//     };
//     // Before updating the post, we need to get the post
//     const getResponse = await request.get('/posts/1');
//     const beforeTitle = getResponse.body.title;
//     // we used await to wait for the response
//     const response = await request.patch('/posts/1').send(data);
//     expect(response.status).toBe(200);
//     // New post dont have the same title as before
//     expect(response.body.title).not.toBe(beforeTitle);
//     // New post has title the same as the one we sent
//     expect(response.body.title).toBe(data.title);
//   });
// });

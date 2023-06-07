import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../../api.jsx';

function RegisterForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const validateEmail = email => {
        return email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 10;
    const isPasswordSame = password === confirmPassword;
    const isNicknameValid = nickname.length >= 2;

    // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
    const isFormValid = isEmailValid && isPasswordValid && isPasswordSame && isNicknameValid;

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await Api.post('user/register', {
                email,
                password,
                nickname,
            });

            // 로그인 페이지로 이동함.
            navigate('/login');
        } catch (err) {
            alert('회원가입에 실패하였습니다.서버를 확인해주세요.');
        }
    };

    return (
        <div style={{ alignItems: 'center', display: 'center', maxWidth: '700px', width: '75vh' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                    src="/logoshort.png"
                    alt="오채완 로고"
                    className="logo"
                    style={{ width: '500px', height: 'auto', maxWidht: '40vh' }}></img>
            </div>

            <div>
                <form onSubmit={handleSubmit} style={{ alignItems: 'center' }}>
                    {/* 이메일 입력창 */}
                    <div className="space-y-15">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h1 className="text-base font-semibold leading-7 text-gray-900">회원가입</h1>
                            <p className="mt-1 text-sm leading-6 text-gray-600">오채완에서 탄소 감축을 함께 실현해요!</p>

                            <div className="mt-10 grid grid-cols-1 gap-y-8">
                                <div className="sm:col-span-4 flex items-center">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900 pr-4"
                                        style={{ width: '100px' }}>
                                        이메일
                                    </label>
                                    <div className="mt-2 flex-grow">
                                        <div className="flex-grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                className="w-full block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="이메일을 입력해 주세요"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>
                                        {!isEmailValid && email !== '' && (
                                            <p className="text-success mt-2">이메일 형식이 올바르지 않습니다.</p>
                                        )}
                                        {!isFormValid && email === '' && (
                                            <p className="text-success mt-2">이메일을 입력해주세요.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-y-8">
                                <div className="sm:col-span-4 flex items-center">
                                    <label
                                        htmlFor="nickname"
                                        className="block text-sm font-medium leading-6 text-gray-900 pr-4"
                                        style={{ width: '100px' }}>
                                        이름
                                    </label>
                                    <div className="mt-2 flex-grow">
                                        <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="text"
                                                name="nickname"
                                                id="nickname"
                                                className="w-full block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="이름을 입력해 주세요"
                                                value={nickname}
                                                onChange={e => setNickname(e.target.value)}
                                            />
                                        </div>
                                        {!isNicknameValid && (
                                            <p className="text-success mt-2">이름은 2글자 이상으로 설정해 주세요.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-y-8">
                                <div className="sm:col-span-4 flex items-center">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900 pr-4"
                                        style={{ width: '100px' }}>
                                        비밀번호
                                    </label>
                                    <div className="mt-2 flex-grow">
                                        <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="w-full block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="비밀번호를 입력해 주세요"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                        {!isPasswordValid && (
                                            <p className="text-success mt-2">비밀번호는 10글자 이상으로 설정해 주세요.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-y-8">
                                <div className="sm:col-span-4 flex items-center">
                                    <label
                                        htmlFor="confirmpassword"
                                        className="block text-sm font-medium leading-6 text-gray-900 pr-4"
                                        style={{ width: '100px' }}>
                                        비밀번호 확인
                                    </label>
                                    <div className="mt-2 flex-grow">
                                        <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="password"
                                                name="confirmpassword"
                                                id="confirmpassword"
                                                className="w-full block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="비밀번호를 다시 입력해 주세요"
                                                value={confirmPassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                        {!isPasswordSame && <p className="text-success mt-2">비밀번호가 일치하지 않습니다.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="button"
                                className="text-sm font-semibold leading-6 text-gray-900"
                                onClick={() => navigate('/login')}>
                                로그인하기
                            </button>
                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                회원가입
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        // <div className="login-page">
        //     <Row className="justify-content-md-center mt-5">
        //         <Col lg={8}>
        //             <Form onSubmit={handleSubmit}>
        //                 <Form.Group controlId="registerEmail">
        //                     <Form.Label>이메일 주소</Form.Label>
        //                     <Form.Control
        //                         className="inputLogin"
        //                         type="email"
        //                         autoComplete="off"
        //                         value={email}
        //                         onChange={e => setEmail(e.target.value)}
        //                     />
        //                     {!isEmailValid && <Form.Text className="text-success">이메일 형식이 올바르지 않습니다.</Form.Text>}
        //                 </Form.Group>

        //                 <Form.Group controlId="registerPassword" className="mt-3">
        //                     <Form.Label>비밀번호</Form.Label>
        //                     <Form.Control
        //                         className="inputLogin"
        //                         type="password"
        //                         autoComplete="off"
        //                         value={password}
        //                         onChange={e => setPassword(e.target.value)}
        //                     />
        //                     {!isPasswordValid && (
        //                         <Form.Text className="text-success">비밀번호는 4글자 이상으로 설정해 주세요.</Form.Text>
        //                     )}
        //                 </Form.Group>

        //                 <Form.Group controlId="registerConfirmPassword" className="mt-3">
        //                     <Form.Label>비밀번호 재확인</Form.Label>
        //                     <Form.Control
        //                         className="inputLogin"
        //                         type="password"
        //                         autoComplete="off"
        //                         value={confirmPassword}
        //                         onChange={e => setConfirmPassword(e.target.value)}
        //                     />
        //                     {!isPasswordSame && <Form.Text className="text-success">비밀번호가 일치하지 않습니다.</Form.Text>}
        //                 </Form.Group>

        //                 <Form.Group controlId="registerName" className="mt-3">
        //                     <Form.Label>이름</Form.Label>
        //                     <Form.Control
        //                         className="inputLogin"
        //                         type="text"
        //                         autoComplete="off"
        //                         value={name}
        //                         onChange={e => setName(e.target.value)}
        //                     />
        //                     {!isNameValid && <Form.Text className="text-success">이름은 2글자 이상으로 설정해 주세요.</Form.Text>}
        //                 </Form.Group>

        //                 <Form.Group as={Row} className="mt-3 text-center">
        //                     <Col sm={{ span: 20 }}>
        //                         <button variant="primary" type="submit" disabled={!isFormValid} className="shadow-button">
        //                             회원가입
        //                         </button>
        //                     </Col>
        //                 </Form.Group>

        //                 <Form.Group as={Row} className="mt-3 text-center">
        //                     <Col sm={{ span: 20 }}>
        //                         <button variant="light" onClick={() => navigate('/login')} className="shadow-button">
        //                             로그인하기
        //                         </button>
        //                     </Col>
        //                 </Form.Group>
        //             </Form>
        //         </Col>
        //     </Row>
        // </div>
    );
}

export default RegisterForm;

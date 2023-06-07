import React from 'react';

function MainPage() {
    return (
        <div>
            <img
                src="/logoshort.png"
                alt="오채완 로고"
                className="logo"
                ></img>
            <p>
                <a href="/login">로그인하기</a>
                <br />
                <a href="/register">회원가입하기</a>
            </p>
        </div>
    );
}

export default MainPage;


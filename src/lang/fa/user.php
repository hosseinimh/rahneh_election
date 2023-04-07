<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'user_not_found' => 'نام کاربری یا کلمه عبور اشتباه است.',
    'username_required' => $requiredMessage('نام کاربری'),
    'username_min' => $minStringMessage('نام کاربری', 6),
    'username_max' => $maxStringMessage('نام کاربری', 50),
    'username_unique' => 'این نام کاربری قبلا ثبت نام کرده است.',
    'password_required' => $requiredMessage('کلمه عبور'),
    'password_min' => $minStringMessage('کلمه عبور', 6),
    'password_max' => $maxStringMessage('کلمه عبور', 50),
    'password_confirmed' => 'کلمه عبور با تاییدیه اش مطابقت نمی کند.',
    'new_password_required' => $requiredMessage('کلمه عبور'),
    'new_password_min' => $minStringMessage('کلمه عبور', 6),
    'new_password_max' => $maxStringMessage('کلمه عبور', 50),
    'new_password_confirmed' => 'کلمه عبور با تاییدیه اش مطابقت نمی کند.',
    'password_error' => 'کلمه عبور اشتباه است.',
    'name_required' => $requiredMessage('نام'),
    'name_min' => $minStringMessage('نام', 3),
    'name_max' => $maxStringMessage('نام', 50),
    'not_authorized' => 'شما مجوز ورود به این قسمت را ندارید.',
    'name' => 'کاربر',
];

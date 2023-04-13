<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'voted_type_undefined' => 'نامشخص',
    'voted_type_0' => 'رای نداده',
    'voted_type_1' => 'رای‌داده / اصالتی',
    'voted_type_2' => 'رای‌داده / وکالتی',
    'voted_type_3' => 'رای‌داده / غیر عضو',
    'name_required' => $requiredMessage('نام'),
    'name_min' => $minStringMessage('نام', 2),
    'name_max' => $maxStringMessage('نام', 50),
    'family_required' => $requiredMessage('نام خانوادگی'),
    'family_min' => $minStringMessage('نام خانوادگی', 2),
    'family_max' => $maxStringMessage('نام خانوادگی', 50),
    'national_code_required' => $requiredMessage('شماره ملی'),
    'national_code_numeric' => $numericMessage('شماره ملی'),
    'national_code_max' => $maxStringMessage('شماره ملی', 50),
    'national_code_digits' => $digitsMessage('شماره ملی', 10),
    'voter_voted' => 'رای‌دهنده تنها یک‌بار مجاز به رای‌دهی می‌باشد.',
    'not_shareholder_voter_voted' => 'رای‌دهنده، پیش از این رای وکالتی خود را ثبت نموده است.',
    'voters_same' => 'رای‌دهنده و سهام‌دار وکالتی نباید یکسان باشند.',
    'voter_should_vote_first' => 'رای‌دهنده، ابتدا باید رای خود را ثبت نماید.',
    'voter_voted_proxical' => 'رای‌دهنده، پیش از این هر سه رای وکالتی خود را ثبت نموده است.',
    'voter_not_found' => 'رای‌دهنده‌ای با این شماره ملی یافت نشد.',
    'voter_found' => 'رای‌دهنده‌ای با این شماره ملی جزو سهام‌داران می‌باشد.',
];

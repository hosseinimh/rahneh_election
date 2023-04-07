<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'name_max' => $maxStringMessage('نام', 50),
    'national_code_required' => $requiredMessage('شماره ملی'),
    'national_code_numeric' => $numericMessage('شماره ملی'),
    'national_code_max' => $maxStringMessage('شماره ملی', 50),
    'national_code_digits' => $digitsMessage('شماره ملی', 10),
];

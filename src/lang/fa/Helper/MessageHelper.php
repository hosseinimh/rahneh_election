<?php

$templateMessages = [
    'required' => 'لطفا :field را وارد نمایید.',
    'minString' => 'طول فیلد :field حداقل باید :length حرف باشد.',
    'maxString' => 'طول فیلد :field حداکثر باید :length حرف باشد.',
    'numeric' => 'مقدار فیلد :field تنها باید شامل اعداد باشد.',
    'minNumeric' => 'مقدار فیلد :field حداقل باید برابر یا بزرگ‌تر از :value باشد.',
    'digits' => 'طول فیلد :field باید :length رقم باشد.',
    'maxDigits' => 'حداکثر طول فیلد :field باید :length رقم باشد.',
    'gtNumeric' => 'مقدار فیلد :field باید بزرگ‌تر از :value  باشد.',
    'gteNumeric' => 'مقدار فیلد :field باید برابر یا بزرگ‌تر از :value باشد.',
    'ltNumeric' => 'مقدار فیلد :field باید کوچک‌تر از :value باشد.',
    'select' => 'لطفا یک :field را انتخاب نمایید.',
];

$requiredMessage = function ($field) use ($templateMessages) {
    $message = $templateMessages['required'];

    return str_replace(':field', $field, $message);
};

$minStringMessage = function ($field, $length) use ($templateMessages) {
    $message = $templateMessages['minString'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':length', $length, $message);
};

$maxStringMessage = function ($field, $length) use ($templateMessages) {
    $message = $templateMessages['maxString'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':length', $length, $message);
};

$numericMessage = function ($field) use ($templateMessages) {
    $message = $templateMessages['numeric'];

    return str_replace(':field', $field, $message);
};

$minNumericMessage = function ($field, $value) use ($templateMessages) {
    $message = $templateMessages['minNumeric'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':value', $value, $message);
};

$digitsMessage = function ($field, $length) use ($templateMessages) {
    $message = $templateMessages['digits'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':length', $length, $message);
};

$maxDigitsMessage = function ($field, $length) use ($templateMessages) {
    $message = $templateMessages['maxDigits'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':length', $length, $message);
};

$gtNumericMessage = function ($field, $value) use ($templateMessages) {
    $message = $templateMessages['gtNumeric'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':value', $value, $message);
};

$ltNumericMessage = function ($field, $value) use ($templateMessages) {
    $message = $templateMessages['ltNumeric'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':value', $value, $message);
};

$gteNumericMessage = function ($field, $value) use ($templateMessages) {
    $message = $templateMessages['gteNumeric'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':value', $value, $message);
};

$selectMessage = function ($field) use ($templateMessages) {
    $message = $templateMessages['select'];

    return str_replace(':field', $field, $message);
};
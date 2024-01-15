<?php

namespace App\Helpers;

use App\Models\Credit;

function createAccountNumber()
{
    $account_exist = Credit::latest()->value('account_number');
    return  $new_account = ($account_exist !== null) ? $account_exist + 1 : 1000000000;
}
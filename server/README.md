# BankAPI

This backend project simulate a bank API built with Node JS and Express , this project is a part of Appleseeds Bootcamp weekend assignment

## how to use this api

this Bank api have a several methods:

### Add users

Can add users to the bank. Each user has the following:
passport id, cash(default 0), credit(default 0)

Example of input:

using - POST

```javascript
{
    "passportid": "123456789",
    "cash": "100",
    "credit": "200",
}
```

### Depositing

Can deposit cash to a user. (by the users passport id and
amount of cash)

using - PUT /:passportid

```javascript
{
    "action": "depositing",
    "actionData": {"depositingAmmount": "50",
}
```

### Update credit

Can update a users credit (only positive numbers)

using - PUT /:passportid

```javascript
{
    "action": "updateCredit",
    "actionData": {"creditAmmount": "50",
}
```

### Withdraw money

Can withdraw money from the user (can withdraw money until
the cash and credit run out)

using - PUT /:passportid

```javascript
{
    "action": "withdraw",
    "actionData": {"withdrawAmmount": "50",
}
```

### Transferring

Can transfer money from one user to another with credit(can
transfer money until the cash and credit run out)

using - PUT /:passportid

```javascript
{
    "action": "transfer",
    "actionData": {"transferAmmount": "50",
    "reciverAccontID": "12345678"}
}
```

### Show details of user

Can fetch all details of a particular user

using - Get /:passportid

### Show details of all users

Can fetch all details of all the users

using - Get

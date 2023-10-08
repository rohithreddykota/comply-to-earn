// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "remix_tests.sol";
import "remix_accounts.sol";
import "../contracts/Compliant.sol";

contract CompliantTest is Compliant {

    address acc0;
    address acc1;
    address acc2;
    address acc3;
    address acc4;

    function beforeAll() public {
        acc0 = TestsAccounts.getAccount(0); 
        acc1 = TestsAccounts.getAccount(1);
        acc2 = TestsAccounts.getAccount(2);
        acc3 = TestsAccounts.getAccount(3);
        acc4 = TestsAccounts.getAccount(4);
    }

    function testTokenInitialValues() public {
        Assert.equal(name(), "Compliant", "token name did not match");
        Assert.equal(symbol(), "CAE", "token symbol did not match");
        Assert.equal(decimals(), 18, "token decimals did not match");
        Assert.equal(totalSupply(), 0, "token supply should be zero");
    }

    function testTokenMinting() public {
        Assert.equal(balanceOf(acc0), 0, "token balance should be zero initially");
        mint(acc0, 10000);
        Assert.equal(balanceOf(acc0), 10000, "token balance did not match");
    }
}

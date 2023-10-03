// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
pragma experimental ABIEncoderV2;
contract money_transfer {
    struct User {
        string name;
    }
    struct Transfer {
        uint time;
        uint amount_of;
        address to_whom;
        address from_who;
        bool status_accept;
        bool canceled;
        bool closed; 
        bytes32 code_word;
    }
    Transfer[] public all_transfers;
    mapping(address => User) users;
    constructor() {
        users[0x5B38Da6a701c568545dCfcB03FcB875f56beddC4].name = "Sasha";
        all_transfers.push(Transfer( block.timestamp, 10000000000000000000, 0x4b8270D04Ac93006B9dBf5c36a576fC8204083Fd, 0xA3EA0D3AcBFf6FD4A4623836626BD7171e3A7Aca,  false, false, false, 0xba8b2d4057f34b9d18ea502e8b45f5a0de9d1cb24e393f14ce5d83514bb04526));
        users[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2].name = "Pavel";
        all_transfers.push(Transfer( block.timestamp, 10000000000000000000, 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, false, true, true, 0xba8b2d4057f34b9d18ea502e8b45f5a0de9d1cb24e393f14ce5d83514bb04526));
    }
    function transfer_money(address payable user_address, bytes32 user_code_word) public payable {
        require(msg.sender != user_address, "you can't transfer money to yourself");
        require(msg.value > 0, "value must be greater than 0");
        all_transfers.push(Transfer( block.timestamp, msg.value, user_address, msg.sender, false, false, false, user_code_word));
    }
    function get_money(bytes32 user_code_word, uint id_transfer) public  {
        // require(all_transfers[id_transfer].closed == false, "no incoming transfers");
        // require(all_transfers[id_transfer].status_accept == false, "money already accepted");
        // require(all_transfers[id_transfer].canceled == false, "transfer canceled");
        require(all_transfers[id_transfer].to_whom == msg.sender, "you arent gainer");
            if (all_transfers[id_transfer].code_word == user_code_word) {
                payable(all_transfers[id_transfer].to_whom).transfer(all_transfers[id_transfer].amount_of);
                all_transfers[id_transfer].closed = true;
                all_transfers[id_transfer].status_accept = true;
            } else {
                all_transfers[id_transfer].closed = true;
                payable(all_transfers[id_transfer].from_who).transfer(all_transfers[id_transfer].amount_of);           
            }
        }
function cancel_transfer(uint id_transfer) public payable {
        require(all_transfers[id_transfer].canceled == false, "transfer already canceled");
        require(all_transfers[id_transfer].from_who == msg.sender, "you are not the sender");
        require(all_transfers[id_transfer].status_accept == false, "money already transfered");
        require(all_transfers[id_transfer].closed == false, "transfer alredy closed");
        payable(msg.sender).transfer(all_transfers[id_transfer].amount_of);
        all_transfers[id_transfer].closed = true;
        all_transfers[id_transfer].canceled = true;
    }
    function get_all_transfers() public returns(Transfer[] memory) {
        return all_transfers;
    }
} 

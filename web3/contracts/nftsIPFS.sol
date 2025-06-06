// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract nftsIPFS {
    address payable contractOwner = payable(0x83d5205172B5C5afdB9b1B9119A19bB2D5D7b2A8);
    uint256 public listingPrice = 0.025 ether;

    struct NFTs {
        string title;
        string description;
        string email;
        string category;
        uint256 fundraised;
        address creator;
        string image;
        uint256 timestamp;
        uint256 id;
        Donation[] donations;
    }

    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(uint256 => NFTs) public nftImages;
    uint256 public imagesCount = 0;

    function uploadIPFS(
        address _creator,
        string memory _image,
        string memory _title,
        string memory _description,
        string memory _email,
        string memory _category
    ) 
        public 
        payable 
        returns(
            string memory,
            string memory,
            string memory,
            address,
            string memory
        ) 
    {
        imagesCount++;
        NFTs storage nft = nftImages[imagesCount];

        nft.title = _title;
        nft.creator = _creator;
        nft.description = _description;
        nft.email = _email;
        nft.category = _category;
        nft.image = _image;
        nft.timestamp = block.timestamp;
        nft.id = imagesCount;

        return(
            _title,
            _description,
            _category,
            _creator,
            _image
        );
    }

    function getAllNFTs() public view returns (NFTs[] memory) {
        uint256 itemCount = imagesCount;
        uint256 currentIndex = 0;

        NFTs[] memory items = new NFTs[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            NFTs storage currentItem = nftImages[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    function getNFTsByCreator(address _creator) public view returns (NFTs[] memory) {
        uint256 totalItemCount = imagesCount;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (nftImages[i].creator == _creator) {
                itemCount += 1;
            }
        }

        NFTs[] memory items = new NFTs[](itemCount);
        for (uint256 i = 1; i <= totalItemCount; i++) {
            if (nftImages[i].creator == _creator) {
                items[currentIndex] = nftImages[i];
                currentIndex += 1;
            }
        }

        return items;
    } 

    function getImage(uint256 id) external view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        uint256,
        address,
        string memory,
        uint256,
        uint256,
        Donation[] memory
    ) {
        NFTs memory nfts = nftImages[id];
        return(
            nfts.title,
            nfts.description,
            nfts.email,
            nfts.category,
            nfts.fundraised,
            nfts.creator,
            nfts.image,
            nfts.timestamp,
            nfts.id,
            nfts.donations
        );
    }

    /* Updates the listing price of the contract */
    function updateListingPrice(uint256 _listingPrice, address owner) public payable {
        require(
            contractOwner == owner, 
            "Only contract owner can update listing price."
        );
        listingPrice = _listingPrice;
    }

    // Donate function
    function donateToImage(uint256 _id, address _donor) public payable {
        uint256 amount = msg.value;

        NFTs storage nft = nftImages[_id];

        (bool sent,) = payable(nft.creator).call{value: amount}("");
        if (sent) {
            nft.fundraised = nft.fundraised + amount;
            Donation memory newDonation = Donation({
                donor: _donor,
                amount: amount,
                timestamp: block.timestamp
            });
            nft.donations.push(newDonation);
        }
    }

    function withdraw(address _owner) external {
        require(_owner == contractOwner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");

        contractOwner.transfer(balance);
    }
}

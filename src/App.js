import logo from './logo.svg';
import './App.css';
import {useMetaMask,MetaMaskProvider} from 'metamask-react';
import contract from './DAOFactory.json';
import erc1155 from './CryptonToken.json';
import dao from './CryptonDAO.json'
import { ethers } from 'ethers'; 
import { useState } from 'react';

const { ethereum } = window;
const contractAddress = "0x9f51718fB10Cf4D29b1cCD21dd4e9F5f6311030d"
const abi = contract.abi;

function App() {
  const { status, connect, account } = useMetaMask();
  const [address,setaddress]=useState('0xce9659d0D1821aF4b575d058dd670eff851826ce')
  const [name,setname]=useState('MonkeyDao')
  const [tokenname,settokenname]=useState('MOnkey')
  const [symbol,setsymbol]=useState('MK')
  const [minQuorum,setminQuorum]=useState('100')
  const [Proposal,setProposal]=useState('ADSFLKJLKJ')
  const [member,setmember]=useState("0xce9659d0D1821aF4b575d058dd670eff851826ce")
  const [delmember,setdelmember]=useState("0xce9659d0D1821aF4b575d058dd670eff851826ce")
  const [Dipositamount,setDipositamount]=useState("100")
  const [withdraw,setwithdraw]=useState("100")
  const [refund,setrefund]=useState(false)
  const [Unstaking,setUnstaking]=useState('50')
  const [childcontr,setchild]=useState('0xA22eBd8194A55a975878C200d1121EE99bfBe1b7')
  const [childcontrerc1155,setchildcontrerc1155]=useState('0x6d6976bea4d5b51870dc8383E4b369c0320c9934')
  const [amount,setamount]=useState("100")
  const [duration,setduration]=useState('3600')
  const [proposaldiposit,setproposaldiposit]=useState('10')
  const [Passing,setPassing]=useState('50')
  const [description,setdescription]=useState('my dao')
  const [imageurl,setimageurl]=useState('')
  const [initailmint,setinitailmint]=useState('5')
  const [mintaddress,setmintaddress]=useState("0xce9659d0D1821aF4b575d058dd670eff851826ce")
  const [mintAmount,setmintAmount]=useState('5')
  const [mintamount,setmintamount]=useState();
  const [miaddress,setmiaddress]=useState("0xce9659d0D1821aF4b575d058dd670eff851826ce")
  const [decision,setdecision]=useState(false)

  async function startPublicsale(){

    // console.log(await nftContract.tokenURI(2))
    // console.log(await nftContract._baseURI())
    // await nftContract.setBaseURI("https://gateway.pinata.cloud/ipfs/QmSZ9eJ9njKJhXcG4J61PiC7vZCQVLsoSN69ZKTeUHT4Hx/")
  }


  async function mint( ){
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(childcontrerc1155, erc1155.abi,signer);
    console.log(mintamount)
     await nftContract.mint(miaddress,mintamount);
  }
  async function create(){
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, abi,signer);
     await nftContract.createContract(name, description ,imageurl,tokenname,symbol,initailmint,Passing,duration,proposaldiposit,refund)
  }
  async function get(){
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, abi,signer);

    setchild(await nftContract.getMyContract());
    console.log(`child address is ${childcontr}`)
    setchildcontrerc1155(await nftContract.getTokenContract());
    console.log(`child erc20 address is ${childcontrerc1155}`)
  }
  async function setwhite(){
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, abi,signer);
    
    // let etherAmount=0.1
    // await nftContract.adopt(id,{
    //   value: ethers.utils.parseEther(etherAmount.toString())
    // });
    
  }
  async function upgrade(){
      // await nftContract.setwhitelister(whiteaddress)
  }
  async function Diposit(){
    let  provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let nftContract = new ethers.Contract(childcontr, dao.abi,signer);
    const erc20 = new ethers.Contract(childcontrerc1155, erc1155.abi,signer);
    let tx =await erc20.approve(childcontr,Dipositamount)
    await tx.wait()
    await nftContract.deposit(Dipositamount)
  }
  async function Withdraw(){
    let  provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let nftContract = new ethers.Contract(childcontr, dao.abi,signer);
    nftContract.withdrawgather()
  }
  async function finshiVote(){
    let  provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let nftContract = new ethers.Contract(childcontr, dao.abi,signer);

    await nftContract.finishVoting(0).then(result=>console.log(result))
  }
  async function Vote(){
    let  provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let nftContract = new ethers.Contract(childcontr, dao.abi,signer);

    await nftContract.vote(0,decision)
  }
  async function gather(){
    let  provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let nftContract = new ethers.Contract(childcontr, dao.abi,signer);

    await nftContract.gather(amount)
  }
  async function approve(){
    let  provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let nftContract = new ethers.Contract(childcontrerc1155, erc1155.abi,signer);
    await nftContract.setApprovalForAll(childcontr,true)
  }
  async function ADDproposal(){
    let  provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let nftContract = new ethers.Contract(childcontr, dao.abi,signer);
    let erc20Contract = new ethers.Contract(childcontrerc1155, erc1155.abi,signer);
    let hash = await erc20Contract.approve(childcontr,"100000")
    await hash.wait()
    await nftContract.addProposal(Proposal)
  }
  async function ADDmember(){
    let  provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let nftContract = new ethers.Contract(childcontr, dao.abi,signer);
    nftContract.addmember(member)
  }
  async function Delmember(){
    let  provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let nftContract = new ethers.Contract(childcontr, dao.abi,signer);
    nftContract.removemember(member)
  }
  return (
    <MetaMaskProvider>
      <div className="App">
        <header className="App-header">
          {/* <input type='text' value={whiteaddress} onChange={e=>setaddress(e.target.value)}> </input> */}
          <button onClick={connect}>connect</button>
          <div id="container">
            <div id="label">DAO Settings</div>
            <label>Name</label>
            <input type="text" value={name} onChange={e => setname(e.target.value)}></input>
            <div>
              <label>Description</label>
              <input type="text" value={description} onChange={e => setdescription(e.target.value)}></input>
            </div>  
            <div>
              <label>ImageURL</label>
              <input type="text" value={imageurl} onChange={e => setimageurl(e.target.value)}></input>
            </div>  
          <div>
          
          </div>

          </div>
          <div id="container">
            <div id="label">Token Settings</div>
            <div>
              <label>tokenname</label>
              <input type="text" value={tokenname} onChange={e => settokenname(e.target.value)}></input>
              <label>symbol</label>
              <input type="text" value={symbol} onChange={e => setsymbol(e.target.value)}></input>
            </div>
            <div>
              <label>Initail treasyry balance</label>
              <input type="text" value={initailmint} onChange={e => setinitailmint(e.target.value)}></input>
            </div>
            <div>
              <label>Address</label>
              <input type="text" value={mintaddress} onChange={e => setmintaddress(e.target.value)}></input>
              <label>Amount</label>
              <input type="text" value={mintAmount} onChange={e => setmintAmount(e.target.value)}></input>
            </div>
          </div>

          <div id="container">
            <div id="label">Token Settings</div>
            <div>
              <label>Passing hold</label>
              <input type="text" value={Passing} onChange={e => setPassing(e.target.value)}></input>
              <label>Voting duration</label>
              <input type="text" value={duration} onChange={e => setduration(e.target.value)}></input>
            </div>
            <div>
              <label>Proposal diposit</label>
              <input type="text" value={proposaldiposit} onChange={e => setproposaldiposit(e.target.value)}></input>
              <label>Unstaking duration</label>
              <input type="text" value={Unstaking} onChange={e => setUnstaking(e.target.value)}></input>
            </div>

            <label>Refund fail</label>
            <input type="checkbox" value={refund} onChange={e=>setrefund(e.target.value)}></input>
          </div>
          
          <div><button onClick={create}> Create Contract </button></div>
          <div><button onClick={get}>GetMycontract</button></div>

          <div id="container">
            <div id="label">ERC20 Token</div>
            <div>
              <label>Price</label>
              <input type="text" value={mintamount} onChange={e => setmintamount(e.target.value)}></input>
              <label>address</label>
              <input type="text" value={miaddress} onChange={e => setmiaddress(e.target.value)}></input>
              <button onClick={mint}>MINT</button>
            </div>
          </div>
          <div id="container">
            <div id="label">DAO</div>
            <div>
              <label>Proposal description</label>
              <input type="text" value={Proposal} onChange={e => setProposal(e.target.value)}></input>
              <button onClick={ADDproposal}>ADDproposal</button>
            </div>
            <div>
              <label>Deposit</label>
              <input type="text" value={Dipositamount} onChange={e => setDipositamount(e.target.value)}></input>
              <button onClick={Diposit}>DEPOSIT</button>
            </div>
            <div>
              <label>Vote decision</label>
              <input type="checkbox" value={decision} onChange={e => setdecision(e.target.value)}></input>
              <button onClick={Vote}>Vote</button>
              
            </div>
            <button onClick={finshiVote}>Finish Vote</button>
          </div>
          <div id="container">
            <div id="label">ADD Members</div>
            <div>
              <label>address</label>
              <input type="text" value={member} onChange={e => setmember(e.target.value)}></input>
              <button onClick={ADDmember}>ADD member</button>
            </div>
            <div>
              <label>address</label>
              <input type="text" value={delmember} onChange={e => setdelmember(e.target.value)}></input>
              <button onClick={Delmember}>delete member</button>
            </div>
            <div>
              <label>amount</label>
              <input type="text" value={amount} onChange={e => setamount(e.target.value)}></input>
              <button onClick={gather}>Donate</button>
            </div>
            <button onClick={Withdraw}>withdraw</button>
          </div>
        </header>
      </div>
    </MetaMaskProvider>
  );
}

export default App;

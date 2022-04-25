//database of items
import React from 'react';
const repo = 'http://hq.mreboy.com/img/'
//repo+''
var iteminfo= [
[//Resources 0
  {name:"Bmats", i:100, b:100,src:'BasicMaterialsIcon.png'},
  {name:"Emats", i:20, e:20,src:'ExplosiveMaterialIcon.png'},
  {name:"Rmats", i:20, r:20,src:'RefinedMaterialsIcon.png'},
  {name:"HEMats", i:20, he:20,src:'HeavyExplosiveMaterialIcon.png'},
  {name:"Diesel", i:1, src:'ResourceFuelIcon.png'},
  {name:"Petrol", i:1, src:'RefinedFuelIcon.png'},
  {name:"Aluminium", i:20, src:'ResouceAluminumRefinedIcon.png'},
  {name:"Iron", i:20, src:'ResouceIronRefinedIcon.png'},
  {name:"Copper", i:20, src:'ResourceCopperRefinedIcon.png'},
],
 
[ // Light Arms 1
{name:".44 Revolver", i:20, b:60, t:50, src:'RevolverItemIcon.png'},
{name:"Hangman (.44)", i:20, b:125, t:50, src:'RevolvingRifleWItemIcon.png'},
{name:".44 Ammo", i:40, b:40, t:40, src:'RevolverAmmoItemIcon.png'},
{name:"No.2 Loughcaster", i : 20, b : 100, t:70, src : 'RifleItemIcon.png'},
{name:"Carbine", i:20, b:140, t:80, src:'CarbineItemIcon.png'},
{name:"Clancy-Cinder", i:15, b:130, t:80, src:'RifleLongW.png'},
{name:"Sampo 77", i:20, b:125, t:80, src:'RifleAutomaticW.png'},
{name:"7.62mm Rifle Ammo", i : 40, b : 80,  t:50,  src : 'RifleAmmoItemIcon.png'},
{name:"SMG", i:20, b:120, t:80, src:'SubMachineGunIcon.png'},
{name:"Liar SMG", i:20, b:120, t:80, src:'Lair.png'},
{name:"9mm SMG Ammo", i:40, b:80, t:50, src:'SubMachineGunAmmoIcon.png'},
{name:"Shotgun", i: 20,  b: 80, t:80, src : 'ShotgunItemIcon.png'},
{name:"Shotgun Ammo", i: 40,  b: 80, t:50, src: 'ShotgunAmmoItemIcon.png'},
{name:"Storm Rifle", i:10, r:20, t:100, src:'AssaultRifleItemIcon.png'},
{name:"Booker Rifle", i:10, b:165, t:80, src:'Booker.png'},
{name:"7.92mm Ammo", i:40, b:120, t:60, src:'AssaultRifleAmmoItemIcon.png'},
{name:"Sniper Rifle", i:5, b:200, r:15, t:125, src:'SniperRifleItemIcon.png'},
{name:"HMG", i:10, r:30, t:100, src:'Malone_MG_Icon.png'},
{name:"12.7mm HMG Ammo", i:20, b:100, t:70, src:'MachineGunAmmoIcon.png'},
{name:"Smoke Grenade", i:10, b:120, t:75, src:'SmokeGrenade.png'},
{name:"Fragmentation Grenade", i:20, b:100, e:20, t:100,  src:'GrenadeItemIcon.png'},
{name:"Gas Grenade", i:10, b:140, t:100, src:'DeadlyGas01Icon.png'},
{name:"Burst Pistol", i:20, b:60, t:50, src:'Burst_Pistol_Icon.png'},
{name:"Pistol Ammo", i:20, b:60, t:50, src:'PistolAmmoItemIcon.png'},
//{i:, b:, name:"",src:""},
],


[ //Heavy Arms 2
{name:"Mortar Tube", i:5, b:100, r:25, t:50, src:'MortarItemIcon.png'},
{name:"Mortar Ammo", i:15, b:60, he:15, t:112, src:'MortarShellIcon.png'},
{name:"Flare Mortar Ammo", i:15, b:60, e:15, t:112, src:'MortarShellFlare.png'},
{name:"Shrapnel Mortar Ammo", i:15, b:90, e:30, t:112, src:'MortarShellShrapnel.png'},
{name:"Cutler RPG", i:5, b:100,r:25, t:50, src:'Cutler_Launcher_Icon.png'},
{name:"Tripod Cutler", i:5, b:200, t:50, src:'ATRPGTWIcon.png'},
{name:"RPG Ammo", i:15, b:60, e:45, t:112, src:'RpgAmmoItemIcon.png'},
{name:"Anti-Tank Rifle", i:5, b:150, t:37, src:'ATRifleItemIcon.png'},
{name:"20mm ATR Ammo", i:10, b:100, t:100, src:'ATRifleAmmoItemIcon.png'},
{name:"Bonesaw RPG", i:5, b:100, r:25, src:'Bonesaw_Icon.png'},
{name:"Tripod Bonesaw RPG", i:5, b:200, src:'Mounted_Bonesaw_Icon.png'},
{name:"Tripod HMG", i:5, b:150, src:'MGHeavyTWItemIcon.png'},
{name:"AT RPG Ammo", i:15, b:60, e:75, t:112, src:'ATRPG_Indirect_shell.png'},
{name:"Launched HE Grenade", i:15, b:150, e:10, t:80, src:'HELaunchedGrenadeItemIcon.png'},
{name:"HE Grenade", i:20, b:180, e:40, t:120, src:'HEGrenadeItemIcon.png'},
{name:"Sticky AT Grenade", i:10, b:50, e:50, t:75, src:'StickyBombIcon.png'},
{name:"Flask AT Grenade", i:15, b:100, e:40, t:75, src:'WhiteAsh.png'},
{name:"30mm Ammo", i:20, b:80, e:20, t:100, src:'MiniTankAmmoItemIcon.png'},
//{name:"75mm Ammo", i:20, b:200, e:400, t:200,src:'BattleTankAmmoItemIcon.png'},
//{name:"Daucus isg.III", i:5, b:150, t:125, src:'InfantrySupportGunItemIcon.png'}
  //{i:, b:, name:"",src:""},
],

[//Heavy Ammo 3
{name:"150mm Arty Ammo", i:5, b:120, he:10, t:65, src:'HeavyArtilleryAmmoItemIcon.png'},
{name:"120mm Arty Ammo", i:5, b:60, e:15, t:55, src:'LightArtilleryAmmoItemIcon.png'},
{name:"300mm SC Ammo", i:5, b:125, he:60, t:125, src:'LRArtilleryAmmoItemIcon.png'},
{name:"250mm Ammo", i:5, b:120, he:25, t:150, src:'MortarTankIcon.png'},
{name:"68mm Ammo", i:20, b:120, e:120, t:200, src:'ATAmmoIcon.png'},
{name:"40mm Ammo", i:20, b:160, e:120, t:200, src:'LightTankAmmoItemIcon.png'}, 
{name:"Rocket Warhead", i:1, r:200, he:1000, t:600, src:'RocketWarheadIcon.png'},
  //{i:, b:, name:"",src:""},
],


[//Utility 4
{name:"Bayonet", i:20, b:40, t:30, src:'BayonetIcon.png'},
{name:"Binoculars", i:5, b:75, t:50, src:'BinocularsItemIcon.png'},
{name:"Gas Mask", i:20, b:160, t:100, src:'GasmaskIcon.png'},
{name:"Gas Mask Filter", i:20, b:100, src:'GasMaskFilterIcon.png'}, 
{name:"Grenade Launcher", i:20, b:85, r:10, src:'GrenadeAdapterIcon.png'}, 
{name:"Radio", i:5, b:100, t:50, src:'RadioItemIcon.png'},
{name:"Radio Backpack", i:5, b:150, t:75, src:'RadioBackpackItemIcon.png'},
{name:"Satchel Charge", i:5, b:100, he:15, t:100, src:'SatchelCharge2.png'},
{name:"Shomvel", i:10, b:200, t:50, src:'ShovelIcon.png'},
{name:"Sledge Hammer", i:10, b:200, t:100, src:'SledgeHammerItemIcon.png'},
{name:"AT Mine", i:10, b:100,e:10, t:200, src:'MineItemIcon.png'},
{name:"Tripod", i:5, b:100, src:'DeployableTripodItemIcon.png'},
{name:"Wrench", i:5, b:75, t:50, src:'WorkWrench.png'},
{name:"Rocket Booster",i:1, r:800, t:600, src:'RocketBoosterIcon.png'},
{name:"Listening Kit", i:3, b:120, t:50, src:'ListeningKitIcon.png'},

  //{i:, b:, name:"",src:""},
],
[//Medicine 5
{name:"Soldier Supplies", i:10, b:80, t:120, src:'SoldierSupplies.png'},
{name:"Bandages", i:50, b:80, t:25, src:'BandagesItemIcon.png'},
{name:"Blood Plasma", i:50, b:80, t:50, src:'BloodPlasmaItemIcon.png'},
{name:"First Aid Kit", i:10, b:60, t:35, src:'FirstAidKitIcon.png'},
{name:"Trauma Kit", i:10, b:80, t:50, src:'TraumaKitItemIcon.png'},
  //{i:, b:, name:"",src:""},
],

[//Supplies 6 
{name:"Bunker Supplies", i:150, b:75, t:125, src:'BunkerSuppliesIcon.png'},
{name:"Garrison Supplies", i:150, b:75, t:300, src:'GarrisonSuppliesIcon.png'},
  //{i:, b:, name:"",src:""},
],

[//Uniforms 7 
{name:"Heavy Ammo Uniforms", i:15, b:100, t:125, v:true, src:'AmmoUniformWIcon.png'},
{name:"Armor Uniforms", i:3, b:100, t:125, v:true, src:'ArmourUniformW.png'},
{name:"Engineer Uniforms", i:15, b:100, t:125, v:true, src:'EngineerUniformWIcon.png'},
{name:"Medic Uniforms", i:15, b:100, t:125, v:true, src:'MedicUniformWIcon.png'},
{name:"Officer Uniforms", i:3, b:100, t:125, v:true, src:'OfficerUniformWIcon.png'},
{name:"Scout Uniforms", i:15, b:100, t:125, v:true, src:'ScoutUniformWIcon.png'},
{name:"Snow Uniforms", i:15, b:100, t:125, v:true, src:'SnowUniformWIcon.png'},
{name:"Mechanized Uniforms", i:15, b:100, t:125, v:true, src:'TankUniformWIcon.png'},
],

[//Vehicles 8
{name:"Ambulance", i:1, b:150, v:true, src:'Dunne_Responder_3e_Vehicle_Icon.png'},
{name:"TAC", i:1, r:40, v:true, src:"O'Brien_v.121_Highlander_Vehicle_Icon.png"},
{name:"HAC", i:1, r:60, v:true, src:"O'Brien_v.101_Freeman_Vehicle_Icon.png"},
{name:"AC", i:1, r:35, v:true, src:"O'Brien_v110_Vehicle_Icon.png"},
{name:"Bonesaw AC", i:1, r:45, v:true, src:"ArmoredCarATWVehicleIcon.png"},
{name:"Bus", i:1, b:100, v:true, src:'Dunne_Caravaner_2f_Vehicle_Icon.png'},
{name:"SH", i:1, r:170, v:true, src:'Silverhand_-_Mk._IV_Vehicle_Icon.png'},
{name:"CT", i:1, r:165, v:true, src:'MediumTank2RangeW.png'},
{name:"Chieftan SH", i:1, r:185, v:true, src:'SilverhandChieftan.png'},
{name:"HTD", i:1, r:160, v:true, src:'NobleWidow.png'},
{name:"FAT", i:1, r:30,  v:true, src:'Collins_Cannon_68mm_Vehicle_Icon.png'},
{name:"HVFC", i:1, r:40, v:true, src:'BalfourRampart.png'},
{name:"FC", i:1, r:30, v:true, src:'Balfour_Wolfhound_40mm_Vehicle_Icon.png'},
{name:"FMG", i:1, r:25, v:true, src:'Swallowtail_988-145-2_Vehicle_Icon.png'},
{name:"FM", i:1, r:35, v:true, src:'Balfour_Falconer_250mm_Vehicle_Icon.png'},
{name:"Flatbed", i:1, r:30, v:true, src:'FlatbedTruckVehicleIcon.png'},
{name:"HT", i:1, r:60, v:true, src:'Niska_Mk._1_Gun_Motor_Carriage_Vehicle_Icon.png'},
{name:"ATHT", i:1, r:85, v:true, src:'Niska_Mk._2_Blinder_Vehicle_Icon.png'},
{name:"APC", i:1, r:20, v:true, src:'Mulloy_LPC_Vehicle_Icon.png'},
{name:"LT", i:1, r:140, v:true, src:'Devitt_Mark_III_Vehicle_Icon.png'},
{name:"ULT", i:1, r:160, v:true, src:'Devitt_Ironhide_Mk._IV_Vehicle_Icon.png'},
{name:"MLT", i:1, r:150, v:true, src:'Devitte-Caine_Mk-IV_MMR_Icon.png'},
{name:"ST", i:1, r:80, v:true, src:'King_Spire_MK-I_Icon.png'},
{name:"Gallant ST", i:1, r:90, v:true, src:'KingGallant.png'},
{name:"Crane", i:1, b:125, v:true, src:'CraneVehicleIcon.png'},
{name:"CV", i:1, b:100, v:true, src:'ConstructionVehicleIcon.png'},
{name:"Motorcycle", i:1, b:85, v:true, src:'Kivela_Power_Wheel_80-1_Vehicle_Icon.png'},
{name:"Fuel Truck", i:1, b:100, v:true, src:'Dunne_Fuelrunner_2d_Vehicle_Icon.png'},
{name:"Std. Truck", i:1, b:100, v:true, src:'Dunne_Transport_Vehicle_Icon.png'},
{name:"Dump Truck", i:1, b:120, v:true, src:'Dunne_Loadlugger_3c_Vehicle_Icon.png'},
{name:"Off-Road Truck", i:1, b:120, v:true, src:'Dunne_Landrunner_12c_Vehicle_Icon.png'},
{name:"Armored Truck", i:1, b:145, v:true, src:'Dunne_Leatherback_2a_Vehicle_Icon.png'},
{name:"LUV", i:1, r:10, v:true, src:'Drummond_100a_Vehicle_Icon.png'},
{name:"LMG LUV", i:1, r:15, v:true, src:'Drummond_Spitfire_100d_Vehicle_Icon.png'},
{name:"ALUV", i:1, r:10, v:true, src:'Drummond_Loscann_55c_Vehicle_Icon.png'},
{name:"Barge", i:1, b:150, v:true, src:'BargeVehicleIcon.png'},
{name:"Freighter", i:1, r:300, v:true, src:'FreighterVehicleIcon.png'},
{name:"Gunboat", i:1, r:120, v:true, src:'74b-1_Ronan_Gunship_Vehicle_Icon.png'},
{name:"Arty Gunboat", i:1, r:120, v:true, src:'74c-2_Ronan_Meteora_Gunship_Vehicle_Icon.png'},
{name:"Landing Ship", i:1, r:300, v:true, src:'Cargoship.png'},
//{name:"BT", i:1, r:400, v:true, src:'Flood_Mk-1_Vehicle_Icon.png'},
//{name:"BT Juggernaut", i:1, r:400, v:true, src:'Flood_Juggernaut_Mk._VII_Vehicle_Icon.png'},
//{name:"BT Ascension", i:1, r:400, v:true, src:'Flood_Ascension_Mk._V_Vehicle_Icon.png'},

  /*{name:"Vehicle", i:1, b:0, r:0, e:0, t:0, v:true, src:""}*/
  //{i:, b:, name:"",src:""},
],

[//Shippables 9 
{name:"Barbed Wire Pallet", i:1, b:100, src:'BarbedWirePlatformItemIcon.png'},
{name:"Concrete Mixer", i:1, r:75, src:'ConcreteMixerIcon.png'},
{name:"EAT", i:1, b:150, v:true, src:'Anti-Tank_Cannon_Structure_Icon.png'},
{name:"120mm Arty Gun", i:1, r:35, v:true, src:'Huber_Lariat_120mm_Structure_Icon.png'},
{name:"150mm Arty Gun", i:1, r:175, v:true, src:'Huber_Exalt_150mm_Structure_Icon.png'},
{name:"EMG", i:1, b:75, v:true, src:'Anti_Infantry_Flak_Gun_Structure_Icon.png'},
{name:"Tank Trap Pallet", i:1, b:100, src:'MetalBeamPlatformItemIcon.png'},
{name:"Resource Container", i:1, b:50, src:'ResourceContainerIcon.png'},
{name:"Sandbag Pallet", i:1, b:100, src:'SandbagPlatformItemIcon.png'},
{name:"Shipping Container (Lg.)", i:1, b:100, src:'ShippingContainerStructureIcon.png'},
{name:"Shipping Container (Sm.)", i:1, b:100, src:'ShippingContainerShortIcon.png'},
],
]

for(let i =0;i<iteminfo.length;i++){
  for(let j=0;j<iteminfo[i].length;j++){
    iteminfo[i][j].src= repo + iteminfo[i][j].src
  }
}
var filters=[
  repo+'IconFilterAll.png',
  repo+'BasicMaterialsIcon.png',
  repo+'IconFilterSmallWeapons.png',
  repo+'IconFilterHeavyWeapons.png',
  repo+'IconFilterHeavyAmmunition.png',
  repo+'IconFilterUtility.png',
  repo+'IconFilterMedical.png',
  repo+'IconFilterResource.png',
  repo+'IconFilterUniforms.png',
  repo+'IconFilterVehicle.png',
  repo+'IconFilterShippables.png',
  ]
class Filter extends React.Component{
  constructor(props) {
    super(props);
  }
  
  render(){
  let filterrow =[];
  filterrow = filters.map((obj,index) => <button key={obj+index} type="button" name="filter" value={index} className={this.props.filter==index ? "btn card_filterbtn selectedfilter" : "btn card_filterbtn"} disabled={this.props.filter==index} onClick={()=>this.props.setfilter(index)}>
        <img className="card_ambush_removeimage" src={obj}/>
      </button>)  
    
  return <div className="btn-group card_filtergroup">{filterrow}</div>
  }
}

function FindItem(array,item){
  //console.log("Looking for "); console.log(item); console.log("in"); console.log(array);
  for(var i=0;i<array.length;i++){
    if(item.catid==array[i].catid&&item.itemid==array[i].itemid){
      return i
    }
  }
  return -1
}

export default {
  cost:iteminfo,
  filters:filters,
  filterrow:Filter,
  findItem:FindItem
}
//disabled={this.state.selectedfilter==index} onClick={()=>this.SelectFilter(index)}
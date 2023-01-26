export interface User{
  id: string;
  email: string;
  password: string;
  prenom: string;
  nom: string;
  tel: string;
  adresse: string;
  cin: string;
  compteName: string;

  grantType:string;
  username:string;
  withRefreshToken:boolean;
  role:string;
  refreshToken:string;




}

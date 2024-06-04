import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { EveWalletService } from '../eve-wallet-service/eve-wallet.service';

@Injectable({
  providedIn: 'root'
})
export class ValidWalletGuard {
  constructor(private wallet: EveWalletService, private router: Router) {}

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    if(this.wallet.isValid())
    {
      return true;
    }
    else
    {
      console.error('You need a valid wallet to access this page.');
      this.router.navigate(['']);
      return false;
    }
  }
}
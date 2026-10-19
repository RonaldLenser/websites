#!/usr/bin/env bash
# Builds this repo: copies every site from github.com/ronlenserdigital into category folders, then deletes itself.
set -e
cd "$(dirname "$0")"
get() { git clone -q --depth 1 "https://github.com/ronlenserdigital/$1.git" "$2" && rm -rf "$2/.git" && echo "ok $2"; }
get tutortime software-and-ai/tutortime
get helix-website software-and-ai/helix-research-technologies
get onyxsupps-seo-audit software-and-ai/onyx-seo-audit
get chasethestorm software-and-ai/stormline
get getontheroof software-and-ai/top-tier-leads-dashboard
get bhr-custom-homes contractors-and-home-services/bhr-custom-homes
get americahomeimprovement contractors-and-home-services/america-affordable-home-improvement
get bright-renovations contractors-and-home-services/bright-renovations
get impact-concrete-breaking contractors-and-home-services/impact-concrete-breaking
get burnslandscaping contractors-and-home-services/burns-landscaping
get pinpoint-calibration contractors-and-home-services/pinpoint-calibration
get the-polished-abode contractors-and-home-services/the-polished-abode
get ozarkelite contractors-and-home-services/ozark-elite-detailing
get NatuFresh contractors-and-home-services/natufresh
get qualitycareservices contractors-and-home-services/quality-care-janitorial
get novaautorepair contractors-and-home-services/nova-auto-repair
get SittoComputerRepair contractors-and-home-services/sittos-computer-repair
get lm-integrations contractors-and-home-services/lm-integrations
get seguroinsurancecentercom professional-services/seguro-insurance
get tateinsurance professional-services/tate-life-insurance
get talaya-thomas professional-services/talaya-thomas
get kba-audit-advisory professional-services/kba-audit-advisory
get wigand-bookkeeping professional-services/wigand-bookkeeping
get 40freedom professional-services/40-to-freedom
get legacy-architect-rva professional-services/legacy-architect-rva
get businessoutcomeengineering professional-services/business-outcome-engineering
get clearpathlocal professional-services/clearpath-local
get mendi2 professional-services/mendi-baron
get tania professional-services/tania-home-health
get seniorhousing professional-services/embracing-our-seniors
get credit-by-cre professional-services/credit-by-cre
get the-mot1vator brands-and-retail/the-mot1vator
get pablohoney-bikes brands-and-retail/pablohoney-bikes
get in-her-m-era brands-and-retail/in-her-m-era
get heim brands-and-retail/heim
get vantara brands-and-retail/stitched
get grounded-gems brands-and-retail/grounded-gems
get chasingcardsfinal brands-and-retail/chasing-cards
get thisissiphozaki brands-and-retail/this-is-siphokazi
get denise2 brands-and-retail/plugg-ev
get stockyards food-events-and-lifestyle/stockyards-restaurant
get honeys-cafe-social food-events-and-lifestyle/honeys-cafe-social
get popnpourace food-events-and-lifestyle/pop-n-pour
get thegoldenlimo food-events-and-lifestyle/golden-limousine
get jcproductions food-events-and-lifestyle/jc-photography
get the5thpentacle food-events-and-lifestyle/fifth-pentacle
get fxbggolf food-events-and-lifestyle/fredericksburg-golf-center
get dreamchasers-training sports-and-training/dreamchasers-basketball
get kali-strikes sports-and-training/kali-strikes
get spotsysoccerclub sports-and-training/spotsylvania-soccer-club
get allred-athletics sports-and-training/allred-athletics
git rm -q --cached build.sh 2>/dev/null || true
rm -f build.sh
git add -A
git commit -q -m "Add all sites, organized by category"
git push -q
echo DONE

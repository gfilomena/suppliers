package services;

import models.License;
import models.dao.LicenseDAO;
import models.dao.LicenseDAOImpl;
import services.db.MongoDBService;

import java.util.List;

public class LicenseService {

    private LicenseDAO licenseDAO;

    public LicenseService(){
        licenseDAO=new LicenseDAOImpl(License.class, MongoDBService.getDatastore());
    }

    public License get(String id){
        return licenseDAO.get(id);
    }

    public License findByName(String name){
        return licenseDAO.findByName(name);
    }

    public List<License> findAll(){
        return licenseDAO.findAll();
    }

    public void deleteAll(){
        licenseDAO.deleteAll();
    }

    public void delete(License license){
        licenseDAO.delete(license);
    }

    public void save(License license){
        licenseDAO.save(license);
    }

    public List<License> findInternetArchiveLicenses() {
        return licenseDAO.findInternetArchivesLicenses();
    }

    public License getInternetArchiveLicenseOrCreate(String lic) {
        License license=this.findInternetArchiveLicenses().stream()
                .filter(l->lic.equals(l.getUrl()))
                .findFirst()
                .orElse(null);
        if(license==null){
            License l=new License();
            l.setName("InternetArchive");
            l.setUrl(lic);
            licenseDAO.save(l);
            return l;
        }else{
            return license;
        }
    }

    public License getByNameOrCreate(String name){
        License license=this.findAll().stream()
                .filter(l->name.equals(l.getName()))
                .findAny()
                .orElse(null);
        if(license==null){
            License l=new License();
            l.setName(name);
            l.setType(name);
            l.setUrl(name);
            licenseDAO.save(l);
            return l;
        }else {
            return license;
        }
    }

    public License findByType(String type) {
        return licenseDAO.findByType(type);
    }
}

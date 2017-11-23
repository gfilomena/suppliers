package common;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

public class ConfigObj {

    public static final Config configuration;

    static{
        configuration= ConfigFactory.load();
    }
}

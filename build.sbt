import scala.language.postfixOps

name := """open-content-discovery-tool"""

version := "0.8-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.8"


libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaWs,
  filters,
  "org.mongodb.morphia" % "morphia" % "1.3.2",
  "com.auth0" % "java-jwt" % "3.2.0",
  "com.auth0" % "auth0" % "1.3.0",
  "com.auth0" % "jwks-rsa" % "0.1.0",
  "org.mindrot" % "jbcrypt" % "0.3m",
  "org.apache.commons" % "commons-lang3" % "3.5",
  "org.nuxeo.client" % "nuxeo-java-client" % "2.6",
  "uk.ac.gate" % "gate-core" % "8.4.1",
  "com.github.tuxBurner" %% "play-akkajobs" % "1.0.1",
  "be.objectify" %% "deadbolt-java" % "2.5.3"
)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

resolvers += "tuxburner.github.io" at "http://tuxburner.github.io/repo"

resolvers += "maven-nuxeo" at "http://maven.nuxeo.com/nexus/content/repositories/public-releases/"
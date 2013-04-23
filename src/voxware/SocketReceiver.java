package voxware;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.vertx.java.core.Handler;
import org.vertx.java.core.buffer.Buffer;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.net.NetSocket;
import org.vertx.java.core.parsetools.RecordParser;
import org.vertx.java.deploy.Verticle;

/**
 * <ul>
 * <li>Title:</li>
 * <li>Description:</li>
 * <li>Created: Apr 9, 2013 by: sumit</li>
 * </ul>
 */
public class SocketReceiver extends Verticle {

    private static final String webroot = "WebContent/";

    private static final List<Object> messages = new ArrayList<Object>();

    private static final Map<String, String> reqResponseMap = new HashMap<String, String>();

    /**
     * Constructs a new <code>SocketReceiver</code> instance.
     */
    public SocketReceiver() {
        super();
    }

    /*
     * (non-Javadoc)
     * @see org.vertx.java.deploy.Verticle#start()
     */
    @Override
    public void start() throws Exception {
        vertx.createNetServer().connectHandler(new Handler<NetSocket>() {
            public void handle(final NetSocket socket) {
                socket.dataHandler(RecordParser.newDelimited("\n", new Handler<Buffer>() {
                    public void handle(Buffer frame) {
                        String line = frame.toString().trim();
                        System.out.println("Line is " + line);
                        Message message = new Message();
                        message.setId(UUID.randomUUID().toString());
                        message.setTimestamp(new Date().toString());
                        message.setRequest(line);
                        if (reqResponseMap.containsKey(line)) {
                            String response = reqResponseMap.get(line);
                            socket.write(response);
                            message.setResponse(response);
                        } else {
                            message.setResponse("none");
                        }
                        messages.add(message);
                    }
                }));
            }
        }).listen(1234);

        vertx.createHttpServer().requestHandler(new Handler<HttpServerRequest>() {
            public void handle(HttpServerRequest req) {
                if (req.path.equals("/data")) {
                    JsonArray jsonArray = new JsonArray(messages);
                    req.response.end(jsonArray.encode());
                } else if (req.path.equals("/reqresp")) {
                    System.out.print(req.method);
                    req.dataHandler(new Handler<Buffer>() {
                        @SuppressWarnings({ "rawtypes"})
                        public void handle(Buffer buffer) {
                            JsonArray jsonArray = new JsonArray(buffer.toString());
                            Object[] cannedMessages = jsonArray.toArray();
                            for (Object cannedMessage : cannedMessages) {
                                reqResponseMap.put(((LinkedHashMap) cannedMessage).get("request").toString(), ((LinkedHashMap) cannedMessage).get("response").toString());
                            }
                        }
                    });
                } else if (req.path.equals("/")) {
                    req.response.sendFile(webroot + "index.html");
                } else {
                    // Clearly in a real server you would check the path for better security!!
                    req.response.sendFile(webroot + req.path);
                }
            }
        }).listen(8080);
    }
}

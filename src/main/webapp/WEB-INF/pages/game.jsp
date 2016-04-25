<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:mancala-layout>

    <div id="board">
        <div id="opp-info" class="user-info">Opponent</div>
        <table class="table" border="1">
            <tr>
                <td id="opp-pit-6" class="opp-pit pit" rowspan="2">0</td>
                <td id="opp-pit-5" class="opp-pit pit">6</td>
                <td id="opp-pit-4" class="opp-pit pit">6</td>
                <td id="opp-pit-3" class="opp-pit pit">6</td>
                <td id="opp-pit-2" class="opp-pit pit">6</td>
                <td id="opp-pit-1" class="opp-pit pit">6</td>
                <td id="opp-pit-0" class="opp-pit pit">6</td>
                <td id="own-pit-6" class="own-pit pit" rowspan="2">0</td>
            </tr>

            <tr>
                <td id="own-pit-0" class="own-pit pit">6</td>
                <td id="own-pit-1" class="own-pit pit">6</td>
                <td id="own-pit-2" class="own-pit pit">6</td>
                <td id="own-pit-3" class="own-pit pit">6</td>
                <td id="own-pit-4" class="own-pit pit">6</td>
                <td id="own-pit-5" class="own-pit pit">6</td>
            </tr>
        </table>
        <div id="own-info" class="user-info">You</div>
        <div id="move-info">Loading...</div>
    </div>
    <script>
        window.gameId = "${gameId}";
    </script>
</t:mancala-layout>
from fastapi.testclient import TestClient


def test_health_ok(client: TestClient) -> None:
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}


def test_unknown_host_rejected(client: TestClient) -> None:
    res = client.get("/api/health", headers={"host": "evil.example"})
    assert res.status_code == 400
